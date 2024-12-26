const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./user')(sequelize, Sequelize);
db.mahasiswa = require('./mahasiswa')(sequelize, Sequelize);
db.dosen = require('./dosen')(sequelize, Sequelize);
db.permintaanTa = require('./permintaan_ta')(sequelize, Sequelize);
db.dosenPembimbing = require('./dosen_pembimbing')(sequelize, Sequelize);
db.logbookTa = require('./logbook_ta')(sequelize, Sequelize);
db.dosenPenguji = require('./dosen_penguji')(sequelize, Sequelize);
db.permintaanSidang = require('./permintaan_sidang')(sequelize, Sequelize);
db.permintaanSeminar = require('./permintaan_seminar')(sequelize, Sequelize);

// Define relationships
db.mahasiswa.hasMany(db.permintaanTa, { foreignKey: 'mahasiswa_id' });
db.permintaanTa.belongsTo(db.mahasiswa, { foreignKey: 'mahasiswa_id' });

db.dosenPembimbing.hasMany(db.permintaanTa, { foreignKey: 'dosen_pembimbing_id' });
db.permintaanTa.belongsTo(db.dosenPembimbing, { foreignKey: 'dosen_pembimbing_id' });

db.permintaanTa.hasMany(db.logbookTa, { foreignKey: 'permintaan_ta_id' });
db.logbookTa.belongsTo(db.permintaanTa, { foreignKey: 'permintaan_ta_id' });

db.dosenPenguji.hasMany(db.permintaanSidang, { foreignKey: 'dosen_penguji_id' });
db.permintaanSidang.belongsTo(db.dosenPenguji, { foreignKey: 'dosen_penguji_id' });

db.dosenPenguji.hasMany(db.permintaanSeminar, { foreignKey: 'dosen_penguji_id' });
db.permintaanSeminar.belongsTo(db.dosenPenguji, { foreignKey: 'dosen_penguji_id' });

// Asosiasi antara PermintaanTA dan PermintaanSidang
db.permintaanTa.hasMany(db.permintaanSidang, { foreignKey: 'permintaan_ta_id' });
db.permintaanSidang.belongsTo(db.permintaanTa, { foreignKey: 'permintaan_ta_id' });

// Asosiasi antara PermintaanTA dan PermintaanSeminar
db.permintaanTa.hasMany(db.permintaanSeminar, { foreignKey: 'permintaan_ta_id' });
db.permintaanSeminar.belongsTo(db.permintaanTa, { foreignKey: 'permintaan_ta_id' });

db.dosenPenguji.belongsTo(db.dosen, { as: 'PengujiSatu', foreignKey: 'penguji_satu_id' });
db.dosenPenguji.belongsTo(db.dosen, { as: 'PengujiDua', foreignKey: 'penguji_dua_id' });
db.dosenPenguji.belongsTo(db.dosen, { as: 'PengujiTiga', foreignKey: 'penguji_tiga_id' });

db.dosenPembimbing.belongsTo(db.dosen, { as: 'PembimbingSatu', foreignKey: 'pembimbing_satu_id' });
db.dosenPembimbing.belongsTo(db.dosen, { as: 'PembimbingDua', foreignKey: 'pembimbing_dua_id' });

db.permintaanTa.hasMany(db.permintaanSeminar, { foreignKey: 'ta_id' });
db.permintaanSeminar.belongsTo(db.permintaanTa, { foreignKey: 'ta_id' });

module.exports = db;