import { DataType } from "sequelize-typescript";
import sequelize from "../config/db";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional ,DataTypes} from 'sequelize';

type VendorStatus = "pending" | "approved" | "rejected";

class Vendor extends Model<InferAttributes<Vendor>, InferCreationAttributes<Vendor>> {  
 declare id: CreationOptional<number>;
 declare userId: number;
 declare status: VendorStatus;
 declare commission_rate: string;
 declare balance?: string;
 declare shopName: string;
}

Vendor.init({
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "approved"
},
commission_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
},
balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: "0.00"
},
shopName: {
    type: DataTypes.STRING,
    allowNull: false,
}


},{
    sequelize,
    modelName: "Vendor",
    timestamps: true,
    tableName: "vendors",
    indexes: [{unique: true, fields: ["userId"]},{fields: ["status"]}]
})

export default Vendor;