let mongoose = require("mongoose");
let connect = require("./Connect");
let sign = require("./Sign");

let connectModel = connect.connectModel;

exports.findAP = (req, res) => {
    let coverSSID = req.query.ssid;
    let date = req.query.date;
    
    sign.getID(req.cookies["Set-Cookie"], (id) => {
        console.log("find ap", id, coverSSID, date);
        if(id == null){
            res.sendStatus(400);
            return;
        }
        
        connectModel.find({"ssid" : coverSSID}, (err, result) => {
            if(err){
                res.sendStatus(500);
                throw err;
            }
            if (results.length > 0) {
                saveUserData(results, date, res, id);
            } else {
                res.sendStatus(400);
            }
        });
    });
}

function saveUserData(results, date, res, id) {
    for (let i = 0; i < results.length; i++) {
        if (compareDate(date, result[i].date)) {
            if (results[i].time) {
                stoolData.saveData(userID, results[i].date, results[i].color, results[i].time, res);
                connectModel.remove({ "ssid": results[i].ssid, "date": results[i].date }, err => {
                    if (err) {
                        throw err;
                    }
                });
            } else {
                connectModel.update({ "ssid": results[i].ssid, "date": results[i].date }, { $set: { "id": id } }, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(400);
}

function compareDate(mobileDateString, coverDateString) {
    let mobileDate = new Date(mobileDateString);
    let coverDate = new Date(coverDateString);
    if (mobileDate >= coverDate) {
        coverDate.setSeconds(coverDate.getSeconds() + 30);
        if (mobileDate <= coverDate) {
            return true;
        }
    }
    return false;
}