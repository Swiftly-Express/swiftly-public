# Google Maps Setup for Swiftly Express

## Quick Start

1. **Get a Google Maps API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the following APIs:
     - Maps JavaScript API
     - Geocoding API (optional, for address lookup)
   - Go to "Credentials" and create an API key
   - Restrict the API key to your domain for production

2. **Add the API key to your project:**
   - Create a `.env.local` file in the root directory:
     ```
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
     ```
   - Replace `your_actual_api_key_here` with your actual Google Maps API key

3. **Restart the dev server:**
   ```powershell
   npm run dev
   ```

## Security Note
- Never commit `.env.local` to git (it's already in `.gitignore`)
- For production, set the environment variable in your hosting platform (Vercel, etc.)
- Restrict your API key to specific domains in Google Cloud Console

## Testing the Map
1. Navigate to the SmartRide booking page
2. Fill out the form and proceed to "Review Summary"
3. Click "Find a Rider" to see the map with the loader overlay
4. The map will show with a centered spinner while searching
5. After 3 seconds, it will show "Rider Found" with the marker on the map
