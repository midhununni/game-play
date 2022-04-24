import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface MatchAttributes {
    id: number;
    name: string;
    match_time: Date,
    home: number
    away: number
    status: string
    winner: number
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface MatchInput extends Optional<MatchAttributes, 'id' | 'winner'> { }
export interface MatchOuput extends Required<MatchAttributes> { }

class Match extends Model<MatchAttributes, MatchInput> implements MatchAttributes {
    public id!: number
    public name!: string
    public match_time!: Date
    public home!: number
    public away!: number
    public status!: string
    public winner!: number

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Match.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    match_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    home: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    away: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PUBLISHED', 'LIVE', 'ENDED'),
        defaultValue : 'PUBLISHED'
    },
    winner: {
        type: DataTypes.INTEGER
    },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Match