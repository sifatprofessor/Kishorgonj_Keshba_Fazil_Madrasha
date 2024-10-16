const isProduction = process.env.NODE_ENV === 'production';
export const BaseURL = isProduction ? "https://kiskfm.vercel.app" : "http://localhost:3000";
