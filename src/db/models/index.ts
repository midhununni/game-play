import Match from './Match'
import Team from './Team'
import User from './User'
import UserMatch from './UserMatch'

UserMatch.belongsTo(Match, { foreignKey: 'match', targetKey: 'id' });
UserMatch.belongsTo(Team, { foreignKey: 'team',  targetKey: 'id'  });
Match.hasMany(UserMatch, { foreignKey: 'match'});
Match.belongsTo(Team , { as : 'homeModel', foreignKey: 'home', targetKey: 'id' });
Match.belongsTo(Team , { as : 'awayModel', foreignKey: 'away', targetKey: 'id' });

export {
    Match,
    Team,
    User,
    UserMatch
}