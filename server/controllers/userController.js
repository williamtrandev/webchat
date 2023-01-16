const User = require("../model/userModel");
const brcypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        console.log(userName);
        const userNameCheck = await User.findOne({ userName });
        if (userNameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }
        // const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email,
            userName,
            // password: hashedPassword,
            password,
        });
        // delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName }); // Find a user with input username
        if (!user) {
            return res.json({
                msg: "Don't exist this username",
                status: false,
            });
        }
        // const isHashedPasswordValid = await brcypt.compare(password,user.password);
        const passwordCheck = (await password) !== user.password;
        if (passwordCheck) {
            return res.json({ msg: "Password is incorrect", status: false });
        }
        // delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (ex) {
        next(ex);
    }
};
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne:req.params.id}}).select(["email","userName","avatarImage", "_id"])
        return res.json(users)
    } catch (ex) {
        next(ex);
    }
};
