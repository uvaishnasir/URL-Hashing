const urlSchema = new mongoose.Schema({
  originalUrl: String,
  hash: String,
  maxClicks: Number,
  clicks: { type: Number, default: 0 },
});

export const Url = mongoose.model("Url", urlSchema);
