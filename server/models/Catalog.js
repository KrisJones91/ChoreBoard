import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Catalog = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: String, required: true },
  dashId: {type: String, ref: 'Dashboard', required: true}
},
  { timestamps: true, toJSON: { virtuals: true } })

Catalog.virtual('dashboard', {
  localField: 'dashId',
  ref: 'Dashboard',
  foreignField: '_id',
  justOne: true
})
Catalog.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Catalog
