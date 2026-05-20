import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    deadline: { type: Date },
    status: { type: String, enum: ['active', 'completed', 'archived'], default: 'active' },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
