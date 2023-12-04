import chai from 'chai';
import sinon from 'sinon';
import express from 'express';
import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHttp from 'chai-http';
import BarangRoute from '../routes/barang.routes.js';
import JenisBarang from '../models/jenisBarang.model.js';
import Barang from '../models/barang.model.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Barang Route - Unit Tests', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/barang', BarangRoute);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /compare', () => {
    it('should compare terjual terbanyak and return barang', async () => {
      // Mock data and behavior
      const req = { query: { jenis_barang: 'some_jenis_barang_id', terjual: 'terbanyak' } };
      const res = { json: sinon.spy() };

      sinon.stub(Barang, 'find').returns({
        populate: sinon.stub().returnsThis(),
        sort: sinon.stub().returns([{ nama_barang: 'Item1' }, { nama_barang: 'Item2' }]),
      });

      await BarangRoute.getCompare(req, res);

      // Assertions
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWithExactly({ barang: [{ nama_barang: 'Item1' }, { nama_barang: 'Item2' }] })).to.be.true;
    });
  });

  describe('GET /', () => {
    it('should get all barang with query parameters', async () => {
      // Mock data and behavior
      const req = {
        query: {
          start_date: '2023-01-01',
          end_date: '2023-12-31',
          nama_barang: 'Item1',
          sort: 'nama_barang',
        },
      };
      const res = { json: sinon.spy() };

      sinon.stub(Barang, 'find').returns({
        populate: sinon.stub().returnsThis(),
        filter: sinon.stub().returnsThis(),
        sort: sinon.stub().returns([{ nama_barang: 'Item1' }]),
      });

      await BarangRoute.getAllBarang(req, res);

      // Assertions
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWithExactly({ barang: [{ nama_barang: 'Item1' }] })).to.be.true;
    });
  });

  describe('POST /', () => {
    it('should create a new barang', async () => {
      // Mock data and behavior
      const req = {
        body: {
          nama_barang: 'New Item',
          stok: 10,
          jenis_barang_id: 'some_jenis_barang_id',
        },
      };
      const res = { json: sinon.spy() };

      sinon.stub(Barang.prototype, 'save');

      await BarangRoute.createBarang(req, res);

      // Assertions
      expect(Barang.prototype.save.calledOnce).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith(sinon.match({ barang: sinon.match.has('nama_barang', 'New Item') }))).to.be.true;
    });
  });

  describe('PUT /:id', () => {
    it('should update an existing barang', async () => {
      // Mock data and behavior
      const req = {
        params: { id: 'some_id' },
        body: {
          nama_barang: 'Updated Item',
          stok: 15,
          jenis_barang_id: 'some_jenis_barang_id',
        },
      };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      sinon.stub(Barang, 'findById').returns({
        ...sinon.stub(),
        ...sinon.stub.returnsThis(),
        ...sinon.stub(),
      });

      sinon.stub(Barang.prototype, 'save');

      await BarangRoute.updateBarang(req, res);

      // Assertions
      expect(Barang.findById.calledOnce).to.be.true;
      expect(Barang.prototype.save.calledOnce).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith(sinon.match({ barang: sinon.match.has('nama_barang', 'Updated Item') }))).to.be.true;
    });

    it('should handle not finding an existing barang', async () => {
      // Mock data and behavior
      const req = {
        params: { id: 'nonexistent_id' },
        body: {
          nama_barang: 'Updated Item',
          stok: 15,
          jenis_barang_id: 'some_jenis_barang_id',
        },
      };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      sinon.stub(Barang, 'findById').returns(null);

      await BarangRoute.updateBarang(req, res);

      // Assertions
      expect(Barang.findById.calledOnce).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match({ message: 'Barang tidak ditemukan' }))).to.be.true;
    });
  });

  describe('DELETE /:id', () => {
    it('should delete an existing barang', async () => {
      // Mock data and behavior
      const req = {
        params: { id: 'some_id' },
      };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      sinon.stub(Barang, 'findByIdAndDelete').returns({ nama_barang: 'Deleted Item' });

      await BarangRoute.deleteBarang(req, res);

      // Assertions
      expect(Barang.findByIdAndDelete.calledOnce).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith(sinon.match({ message: 'Barang berhasil dihapus' }))).to.be.true;
    });

    it('should handle not finding an existing barang for deletion', async () => {
      // Mock data and behavior
      const req = {
        params: { id: 'nonexistent_id' },
      };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      sinon.stub(Barang, 'findByIdAndDelete').returns(null);

      await BarangRoute.deleteBarang(req, res);

      // Assertions
      expect(Barang.findByIdAndDelete.calledOnce).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(sinon.match({ message: 'Barang tidak ditemukan' }))).to.be.true;
    });
  });

  // Add more unit tests for other route functions...

});
