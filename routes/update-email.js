const express = require("express");
const router = express.Router();
const sellerRegister = require("../src/models/Seller Register");
const buyerRegister = require("../src/models/Buyer Register");

// isLoggedIn Middleware

const { requireLogin } = require("../isLoggedIn");

// Post

router.post("/updateEmail", requireLogin, async (req, res) => {
    try {
        let current_email = req.body.currentMail;
        let new_email = req.body.newMail;

        if (req.session.seller === true) {
            let userEmail = await sellerRegister.findOne({ email: current_email });

            if (userEmail) {
                var demail = userEmail.email;

                if (demail === current_email) {
                    await sellerRegister.updateOne({ email: demail }, { $set: { email: new_email } });
                    req.flash("updates", "Email updated successfully !!!")
                    res.redirect("/seller-form");
                }
            }
            else {
                req.flash("updatee", "The email id entered is not registered")
                res.redirect("/seller-form");
            }
        }
        else if (req.session.buyer === true) {
            let userEmail = await buyerRegister.findOne({ email: current_email });

            if (userEmail) {
                var demail = userEmail.email;

                if (demail === current_email) {
                    await buyerRegister.updateOne({ email: demail }, { $set: { email: new_email } });
                    req.flash("updates", "Email updated successfully !!!")
                    res.redirect("/buyer-form");
                }
            }
            else {
                req.flash("updatee", "The email id entered is not registered")
                res.redirect("/buyer-form");
            }
        }
        else {
            if (req.session.seller === true) {
                req.flash("updatee", "Err! An error occured")
                res.redirect("/seller-form")
            }
            else if (req.session.buyer === true) {
                req.flash("updatee", "Err! An error occured")
                res.redirect("/buyer-form")
            }
        }

    } catch (error) {
        if (req.session.seller === true) {
            req.flash("updatee", error.message)
            res.redirect("/seller-form");
        } else if (req.session.buyer === true) {
            req.flash("updatee", error.message)
            res.redirect("/buyer-form");
        }
    }
})

module.exports = router;