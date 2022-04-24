import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface TeamAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<TeamAttributes, 'id' > {}
export interface UserOuput extends Required<TeamAttributes> {}

class Team extends Model<TeamAttributes, UserInput> implements TeamAttributes {
    public id! : number
    public name! : string
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
  }
  
  Team.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default Team