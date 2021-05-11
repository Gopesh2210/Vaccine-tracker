const axiosClient = require('../connector/axios')
const config = require('../config')
const nodemailerConfig = require('../connector/mail')

const slotsTracker = (counter) => {

    let formattedDate = updateDate()

    let requestOption = {
        method: 'GET',
        url: config.cowinUrl,
        params: { district_id: config.cities.mumbai , date: formattedDate },
        headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    }

    axiosClient(requestOption).then(response => {
        checkSlots(response,counter)
    })
}

const updateDate = () => {
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    return date
}

const checkSlots = (response,counter) => {
    
    const slots = [];
    const data = response.data.centers;

    data.forEach(center => {
        let sessionsAvailable = center.sessions.filter(session => session.available_capacity > 0)
        if(sessionsAvailable && sessionsAvailable.length){
            slots.push({
                centerName : center.name,
                centerAddress : center.address,
                sessions : sessionsAvailable.map(session => {
                    return {
                        date : session.date,
                        available_capacity : session.available_capacity,
                        slots : session.slots,
                        vaccine : session.vaccine,
                        min_age_limit : session.min_age_limit
                    }
                })

            })
        }
    })
    console.log("CHECK FILTERED DATA " + counter, slots)
    mailNotifier(slots)
}

const mailNotifier = (slotsInfo) => {
    let outputContent = `<div><span>Hey ,</span><div style="margin: 10px 0;font-size: 16px;font-weight: bold">Vaccine Slots are available now!</div><div><div style="margin-top: 30px;">Visit site : <span style="font-weight: bolder; font-size: 18px;">https://www.cowin.gov.in/home</span></div><div style="margin: 20px 0;"><span style="font-size: 15px;margin-right: 10px">Slots Information as a json object</span><span> JSON formatter site : https://jsonformatter.curiousconcept.com</span></div></div><div style="margin: 10px 0;">
    ${JSON.stringify(slotsInfo)}</div></div>`

    // mail options to send
    let mailOptions = {
        from: config.sender.user, // sender address
        to: config.receiver.users, // list of receivers
        cc: "",
        subject: "[IMPORTANT] Vaccine Slot Available", // Subject line
        text: JSON.stringify(slotsInfo), // plain text body
        html: outputContent, // html body
    }
    nodemailerConfig(mailOptions)
}

module.exports = slotsTracker