import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Make sure to export your Express app instance
import JenisBarang from '../models/jenisBarang.model.js';
import Barang from '../models/barang.model.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Barang Route - Integration Tests', () => {
  before(async () => {
    // Setup any necessary data before tests
    const jenisBarangData = [
      { nama_jenis_barang: 'Konsumsi' },
      { nama_jenis_barang: 'Pembersih' },
    ];
    await JenisBarang.create(jenisBarangData);
  });

  after(async () => {
    // Clean up after tests
    await JenisBarang.deleteMany({});
    await Barang.deleteMany({});
  });

  it('should compare terjual terbanyak and return barang', async () => {
    const jenisKonsumsiId = (await JenisBarang.findOne({ nama_jenis_barang: 'Konsumsi' }).lean())._id;
    const jenisPembersihId = (await JenisBarang.findOne({ nama_jenis_barang: 'Pembersih' }).lean())._id;
    // Add test data
    const barangData = [
      { nama_barang: 'Item1', stok: 10, jenis_barang_id: jenisKonsumsiId, transaksi: [] },
      { nama_barang: 'Item2', stok: 20, jenis_barang_id: jenisPembersihId, transaksi: [] },
    ];
    await Barang.create(barangData);

    // Perform the HTTP request
    const res = await chai.request(app).get('/barang/compare?jenis_barang=some_jenis_barang_id&terjual=terbanyak');

    // Assertions
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.barang).to.be.an('array');
    // Add more assertions...
  });

  it('should update a barang by ID', async () => {
    const jenisKonsumsiId = (await JenisBarang.findOne({ nama_jenis_barang: 'Konsumsi' }).lean())._id;
    const jenisPembersihId = (await JenisBarang.findOne({ nama_jenis_barang: 'Pembersih' }).lean())._id;
    // Add test data
    const barangData = { nama_barang: 'ItemToUpdate', stok: 15, jenis_barang_id: jenisKonsumsiId };
    const createdBarang = await Barang.create(barangData);

    // Perform the HTTP request
    const res = await chai
      .request(app)
      .put(`/barang/${createdBarang._id}`)
      .send({ nama_barang: 'UpdatedItem', stok: 20, jenis_barang_id: jenisPembersihId });

    // Assertions
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.barang).to.have.property('nama_barang', 'UpdatedItem');
  });

  it('should delete a barang by ID', async () => {
    const jenisKonsumsiId = (await JenisBarang.findOne({ nama_jenis_barang: 'Konsumsi' }).lean())._id;
    const jenisPembersihId = (await JenisBarang.findOne({ nama_jenis_barang: 'Pembersih' }).lean())._id;
    // Add test data
    const barangData = { nama_barang: 'ItemToDelete', stok: 10, jenis_barang_id: jenisPembersihId };
    const createdBarang = await Barang.create(barangData);

    // Perform the HTTP request
    const res = await chai.request(app).delete(`/barang/${createdBarang._id}`);

    // Assertions
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message', 'Barang berhasil dihapus');
  });

  it('should create a new barang', async () => {
    const jenisKonsumsiId = (await JenisBarang.findOne({ nama_jenis_barang: 'Konsumsi' }).lean())._id;
    const jenisPembersihId = (await JenisBarang.findOne({ nama_jenis_barang: 'Pembersih' }).lean())._id;
    // Perform the HTTP request
    const res = await chai
      .request(app)
      .post('/barang')
      .send({ nama_barang: 'NewItem', stok: 15, jenis_barang_id: jenisPembersihId });

    // Assertions
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.barang).to.have.property('nama_barang', 'NewItem');
    expect(res.body.barang).to.have.property('jenis_barang_id', jenisPembersihId);
  });

  it('should get all barang with query parameters', async () => {

    const jenisKonsumsiId = (await JenisBarang.findOne({ nama_jenis_barang: 'Konsumsi' }).lean())._id;
    const jenisPembersihId = (await JenisBarang.findOne({ nama_jenis_barang: 'Pembersih' }).lean())._id;
    // Add test data
    const barangData = [
      { nama_barang: 'Item1', stok: 10, jenis_barang_id: jenisKonsumsiId, transaksi: [] },
      { nama_barang: 'Item2', stok: 20, jenis_barang_id: jenisPembersihId, transaksi: [] },
    ];
    await Barang.create(barangData);

    // Perform the HTTP request
    const res = await chai
      .request(app)
      .get('/barang?start_date=2023-01-01&end_date=2023-12-31&nama_barang=Item1&sort=nama_barang');

    // Assertions
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.barang).to.be.an('array');
    // Add more assertions...
  });

  // Add more integration tests for other routes...
});
