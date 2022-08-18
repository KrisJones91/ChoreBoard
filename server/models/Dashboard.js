import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Dashboard = new Schema({
  title: { type: String, required: true },
  authorId: { type: String, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

Dashboard.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Dashboard
