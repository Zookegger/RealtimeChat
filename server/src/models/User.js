import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * @typedef {('male'|'female'|'other')} Gender - Possible gender values
 */
const genders = ["male", "female", "other"];
const user_roles = ["admin", "user"];

/**
 * Mongoose schema for User
 * @typedef {Object} UserSchema
 * @property {string} userName - Unique username
 * @property {string} email - Unique email address
 * @property {Role} userRole - Unique email address
 * @property {boolean} isEmailVerified - Email verification status
 * @property {string} password - Hashed password (automatically excluded from queries)
 * @property {string} fullname - User's full name
 * @property {Date} birthday - User's date of birth
 * @property {Gender} gender - User's gender
 * @property {Date} createdAt - Auto-generated creation timestamp
 * @property {Date} updatedAt - Auto-generated update timestamp
 */
const userSchema = new mongoose.Schema(
	{
		/**
		 * Username field
		 */
		userName: {
			type: String,
			required: [true, "Username is required"],
			trim: true,
			// unique: true,
		},

		/**
		 * Email address field
		 */
		email: {
			type: String,
			required: [true, "Email is required"],
			// unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
				message: "Invalid email format",
			},
		},
		userRole: {
			type: String,
			enum: {
				values: user_roles,
				message: 'Invalid role',
			},
			required: true,
			default: user_roles[1] // User
		},
		/**
		 * Email verification status
		 */
		isEmailVerified: {
			type: Boolean,
			default: false,
		},

		/**
		 * Password field (automatically hashed before save)
		 */
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: [8, "Password must be at least 8 characters"],
			select: false,
		},

		/**
		 * Full name field
		 */
		fullname: {
			type: String,
			required: [true, "Full name is required"],
			trim: true,
			maxlength: [100, "Full name cannot exceed 100 characters"],
		},

		/**
		 * Date of birth field
		 */
		birthday: {
			type: Date,
			required: [true, "Date of birth is required"],
			validate: {
				validator: (dob) => dob < new Date(),
				message: "Date of birth must be in the past",
			},
		},

		/**
		 * Gender field
		 */
		gender: {
			type: String,
			enum: {
				values: genders,
				message: "Invalid gender selection",
			},
			required: [true, "Gender is required"],
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				delete ret.password;
				delete ret.__v; // Remove version key
				return ret;
			},
		},
		methods: {
			/**
			 * Compares plain text password with hashed password
			 * @param {string} password - Plain text password to compare
			 * @returns {boolean} True if passwords match
			 */
			async checkPassword(password) {
				return await bcrypt.compare(password, this.password);
			},
		},
	}
);

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ userName: 1 }, { unique: true });

/**
 * Pre-save hook to hash password before saving
 * @param {function} next - Mongoose next middleware function
 */
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});

/**
 * Mongoose User model
 * @typedef {mongoose.Model<UserSchema>} UserModel
 */
const User = mongoose.model("User", userSchema);

export default User;
