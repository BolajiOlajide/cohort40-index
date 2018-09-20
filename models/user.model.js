import { Sequelize, Model } from 'sequelize';
import bcrypt from 'bcrypt';


export default class User extends Model {
    static modelFields = {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'The email is invalid'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isLongEnough(value) {
                    if (value.length < 6) {
                        throw new Error('Password must be atleast 6 characters');
                    }
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(value, salt);
                    this.setDataValue('password', value);
                }
            }
        }
    }

    static init(sequelize) {
        const model = super.init(User.modelFields, { sequelize });
        return model;
    }
}
