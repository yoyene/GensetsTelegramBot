const Telegraf = require('telegraf');
const functions = require('firebase-functions');
const bot = new Telegraf(functions.config().telegrambot.key);
var fname;
var now = new Date();


var Mich = function (hours, needsTipul) {
    this.hours = hours
    this.needsTipul = needsTipul
}

var g1 = new Mich(0, false)
var g2 = new Mich(0, false)
var g3 = new Mich(0, false)
var g4 = new Mich(0, false)
var mk = new Mich(0, false)
var ma = new Mich(0, false)

function NeedsTipul(Hours) {
    if (Hours % 6000 >= 5500)
        return true;
    else
        if (Hours % 2000 >= 1800) 
            return true;
        else
            return (Hours % 400 >= 350)
}

bot.hears('hi', (ctx) => ctx.reply('Hey there'));

function start(ctx) {
    ctx.telegram.sendMessage(ctx.chat.id, 'Choose Generator', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'G1', callback_data: 'g1' }, { text: 'G2', callback_data: 'g2' },
                { text: 'G3', callback_data: 'g3' }, { text: 'G4', callback_data: 'g4' },
                { text: 'MK', callback_data: 'mk' }, { text: 'MA', callback_data: 'ma' },
                { text: 'END', callback_data: 'end' }]]
        }
    })
}

try{
bot.start((ctx) => {
    var newdate = new Date()
    if (now !== newdate) {
        now = newdate;
    }
    fname = ctx.message.from.first_name
    console.log(fname);
    console.log(ctx.url)
    start(ctx)
})}
catch(err)
{console.log("Yerror:" + err)}

bot.action('g1', (ctx) => {
    ctx.reply('Enter G1 Hours:')
    process.env.gen = 'G1';
    console.log(process.env.gen);
})

bot.action('g2', (ctx) => {
    ctx.reply('Enter G2 Hours:')
    process.env.gen = 'G2';
    console.log(process.env.gen);
})

bot.action('g3', (ctx) => {
    ctx.reply('Enter G3 Hours:')
    process.env.gen = 'G3';
    console.log(process.env.gen);
})
bot.action('g4', (ctx) => {
    ctx.reply('Enter G4 Hours:')
    process.env.gen = 'G4';
    console.log(process.env.gen);
})
bot.action('mk', (ctx) => {
    ctx.reply('Enter Madhes Kidmi Hours:')
    process.env.gen = 'MK';
    console.log(process.env.gen);
})
bot.action('ma', (ctx) => {
    ctx.reply('Enter Madhes Kidmi Hours:')
    process.env.gen = 'MA';
    console.log(process.env.gen);
})

    bot.action('end', (ctx) => {
        msg = `${now.toDateString()}\n----------\n${fname}\n----------\nG1: ${g1.hours} \nG2: ${g2.hours}\nG3: ${g3.hours}\nG4: ${g4.hours}\n----------\nMadhes Kidmi: ${mk.hours}\nMadhes Ahori: ${ma.hours}`
        if (g1.needsTipul || g2.needsTipul || g3.needsTipul || g4.needsTipul || mk.needsTipul || ma.needsTipul)
            msg += `\n----------`
        if (g1.needsTipul)
            msg += `\nG1 NEEDS TIPUL`
        if (g2.needsTipul)
            msg += `\nG2 NEEDS TIPUL`
        if (g3.needsTipul)
            msg += `\nG3 NEEDS TIPUL`
        if (g4.needsTipul)
            msg += `\nG4 NEEDS TIPUL`
        if (mk.needsTipul)
            msg += `\nMadhes Kidmi NEEDS TIPUL`
        if (ma.needsTipul)
            msg += `\nMadhes Achori NEEDS TIPUL`
        console.log(msg);
        ctx.telegram.sendMessage(ctx.chat.id, msg)
        ctx.telegram.sendMessage(ctx.chat.id, 'Are the Hours Correct?', {
            reply_markup: {
                inline_keyboard: [[
                    { text: 'YES!', callback_data: 'publish' }, { text: 'NO!', callback_data: 'loop' }]]
            }
        })
    })

bot.action('publish', (ctx) => {
    console.log('YES!');
    if( msg!==null){
        ctx.telegram.sendMessage('-1001303496661', msg)
    }
        
    ctx.telegram.sendMessage(ctx.chat.id, 'Hours were sent GOODNIGHT:)!')
})

bot.action('loop', (ctx) => {
    console.log('NO!');
    ctx.reply('FIX YOURSELF')
})

try {
    bot.on('message', (ctx) => {
        if (process.env.gen === 'G1') {
            //if (!ctx.message == null) {
            g1.hours = ctx.message.text
            console.log(ctx.message.text);
            g1.needsTipul = NeedsTipul(ctx.message.text)
            process.env.gen = null
            console.log(g1);
            //console.log(g1.needsTipul);
        }
        else
            if (process.env.gen === 'G2') {
                g2.hours = ctx.message.text
                console.log(ctx.message.text);
                g2.needsTipul = NeedsTipul(ctx.message.text)
                process.env.gen = null
                console.log(g2);
            }
            else
                if (process.env.gen === 'G3') {
                    g3.hours = ctx.message.text
                    console.log(ctx.message.text);
                    g3.needsTipul = NeedsTipul(ctx.message.text)
                    process.env.gen = null
                    console.log(g3);
                }
                else
                    if (process.env.gen === 'G4') {
                        g4.hours = ctx.message.text
                        console.log(ctx.message.text);
                        g4.needsTipul = NeedsTipul(ctx.message.text)
                        process.env.gen = null
                        console.log(g4);
                    }
                    else
                        if (process.env.gen === 'MK') {
                            mk.hours = ctx.message.text
                            console.log(ctx.message.text);
                            mk.needsTipul = NeedsTipul(ctx.message.text)
                            process.env.gen = null
                            console.log(mk);
                        }
                        else
                            if (process.env.gen === 'MA') {
                                ma.hours = ctx.message.text
                                console.log(ctx.message.text);
                                ma.needsTipul = NeedsTipul(ctx.message.text)
                                process.env.gen = null
                                console.log(ma);
                            }
    })
}
catch (err) { console.log("Yerror:" + err);}
   
bot.launch();

exports.bot = functions.https.onRequest((req, res) =>
    bot.handleUpdate(req.body, res)
    // .then((rv) => {
    //     res.send(rv.data())
    //     console.log(rv)
    // })
    .catch((err)=>{
        res.status(5000).send(err)
        console.log("Yerror:" + err)
    }),
);