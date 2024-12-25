const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
	body("firstName")
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 2, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body("lastName")
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 2, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Please enter a valid email.")
		.isLength({ min: 6, max: 25 })
		.withMessage("Email length must be between 6 and 25 characters ."),
	body("age")
		.toInt()
		.isInt({ min: 18, max: 120 })
		.withMessage("Age length must be between 18 and 120 ."),
	body("bio")
		.trim()
		.isLength({ min: 0, max: 200 })
		.withMessage("Bio length must be between 0 and 200 characters ."),
];

const validateSearch = [
	body("search")
		.trim()
		.isAlpha()
		.withMessage(`name ${alphaErr}`)
		.isLength({ min: 2, max: 25 })
		.withMessage(`Name length must be between 2 and 100 .`),
];

exports.userListGet = (req, res) => {
	res.render("index", {
		title: "User-List",
		users: usersStorage.getUsers(),
	});
};

exports.userCreateGet = (req, res) => {
	res.render("createUser", {
		title: "Create-User",
	});
};

exports.userCreatePost = [
	validateUser,
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("createUser", {
				title: "Create-user",
				errors: errors.array(),
			});
		}

		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.addUser({ firstName, lastName, email, age, bio });
		res.redirect("/");
	},
];

exports.usersUpdateGet = (req, res) => {
	const user = usersStorage.getUser(req.params.id);
	res.render("updateUser", {
		title: "Update user",
		user: user,
	});
};

exports.usersUpdatePost = [
	validateUser,
	(req, res) => {
		const user = usersStorage.getUser(req.params.id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("updateUser", {
				title: "Update user",
				user: user,
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.updateUser(req.params.id, {
			firstName,
			lastName,
			email,
			age,
			bio,
		});
		res.redirect("/");
	},
];

exports.usersDeletePost = (req, res) => {
	usersStorage.deleteUsers(req.params.id);
	res.redirect("/");
};

exports.userSearch = (req, res) => {
	res.render("search", {
		title: "Search page",
		users: null,
	});
};

exports.userSearchName = [
	validateSearch,
	(req, res) => {
		const errors = validationResult(req);
		const { search } = req.body;
		if (!errors.isEmpty()) {
			return res.status(400).render("search", {
				errors: errors.array(),
				title: "Search page",
				users: null,
			});
		}
		console.log(search);
		const users = usersStorage.searchUsers(search);
		res.render("search", {
			title: "Search page",
			users,
		});
	},
];
