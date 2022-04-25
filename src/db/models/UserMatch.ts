import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserMatchAttributes {
  id: number;
  user: number;
  match: number;
  team: number;
  
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserMatchInput extends Optional<UserMatchAttributes, 'id' > {}
export interface UserMatchOuput extends Required<UserMatchAttributes> {}

class UserMatch extends Model<UserMatchAttributes, UserMatchInput> implements UserMatchAttributes {
    public id! : number
    public match! : number
    public team! : number
    public user! : number
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  UserMatch.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    match: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    team: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default UserMatch