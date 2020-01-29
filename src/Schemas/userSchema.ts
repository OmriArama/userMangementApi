import { Document, model, Schema } from 'mongoose';
import { userInterface } from '../Interfaces/userInterface';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (firstName) {
                if (/^[a-zA-Z]+$/.test(firstName)) {
                    return true;
                }
                return false;
            },
            message:'fail validation must contain only letters'
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (lastName) {
                if (/^[a-zA-Z]+$/.test(lastName)) {
                    return true;
                }
                return false;
            },
            message:'fail validation must contain only letters'
        }
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
}, { versionKey: false });

userSchema.index({ firstName: 1 });
userSchema.index({ userName: 1 });
userSchema.index({ lastName: 1 })



export interface IUserModal extends userInterface, Document { }

export const userDAL = model<IUserModal>(
    'users',
    userSchema
);
