const db = require("../utils/database");

module.exports.signin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let [userRows] = await db.execute(
            `SELECT * FROM users_todo WHERE email = ? AND password = ?`,
            [email, password]
        );

        if (userRows.length > 0) {
            res.json({
                status: 200,
                role: userRows[0].role,
                usersTodo_id: userRows[0].usersTodo_id,
                message: "Sign in successfully",
            });
        } else {
            res.json({
                status: 401,
                role: null,
                usersTodo_id: null,
                message: "Sign in failed",
            });
        }
    } catch (error) {
        console.log(error);
    }
};
