# swiftly-express-web

Public Next.js (TypeScript) site for Swiftly Express.

Quick start (PowerShell):

```powershell
cd swiftly-express-web
npm install
npm run dev
```

Notes:
- This repo contains only public-facing pages. The dashboard lives in a separate repository.
- Tailwind CSS is configured. Run `npm run dev` to start the dev server.

## SmartRide booking — Pricing & Logic

This section documents the math, pricing rules, and state transitions used by the SmartRide booking flow implemented in `app/smartbooking/smartride-booking.tsx`.

### Terminology & units
- **Currency:** ₦ (Nigerian Naira) throughout.
- **Weight:** kilograms (kg).
- **Dimensions:** centimeters (cm).
- **Volumetric divisor:** `5000` (cm -> kg conversion common for courier services).

### High-level flow
- `form` (Package Information): user fills sender, recipient, and package details (weight, length, width, height, declared value).
- `summary` (Package Summary): shows calculated pricing (Base Rate, Insurance, Total) and allows user to go Back to `form` or Find a Rider.
- `finding-rider`: simulation state while a rider is being matched.
- `rider-found`: rider matched — proceeds to payment.
- `rider-details`: shows rider info and tracking.

### Where the logic lives
- File: `app/smartbooking/smartride-booking.tsx`
- Main pricing helper: `calculateTotal()` — returns an object with `baseRate`, `insurance`, `total`, and a `details` object for debugging (weights, volumetric, charges).

### Pricing rules (as implemented)
- **Delivery base by service**
	- `Smart Ride` => base delivery fee = ₦500
	- any other delivery type => base delivery fee = ₦1000

- **Weight and volumetric calculation**
	- User-entered weight is taken as `weight` (kg).
	- Volumetric weight is computed as: (length * width * height) / 5000
		- Example: a 30×20×10 cm parcel => volumetric = (30*20*10)/5000 = 1.2 kg
	- Effective weight = max(actual weight, volumetric weight, 0)
	- Weight charge = ceil(effectiveWeight) * perKgRate
		- Current `perKgRate` = ₦200 (tunable constant in the file)
		- We round up the effective weight with `Math.ceil` to charge per whole kilogram
	- `baseRate` = baseDelivery + weightCharge

- **Insurance**
	- Insurance is 1% of the declared value when declared value > 0
	- Minimum insurance charged is ₦200 (if declaredValue > 0)
	- `insurance = declaredValue > 0 ? max(round(declaredValue * 0.01), 200) : 0`

- **Total**
	- `total = baseRate + insurance`

### Notes about numeric parsing and safety
- All numeric inputs are parsed using `parseFloat(...) || 0` so empty/invalid inputs default to 0.
- Declared value display uses formatted `toLocaleString()` to show thousands separators.
- `calculateTotal()` also returns a `details` object with:
	- `weight`, `length`, `width`, `height` (raw parsed numbers)
	- `volumetricWeight` (calculated float)
	- `effectiveWeight` (float used for charging)
	- `weightCharge` (rounded per-kg charge)
	- `declaredValue` (parsed numeric)

### Where to change rates and behavior
- Per-kg rate: change `perKgRate` inside `calculateTotal()` (current value ₦200).
- Volumetric divisor: change the `5000` divisor to another value if you use a different volumetric rule.
- Base delivery fees: change the `baseDelivery` assignment (500/1000) to match product pricing.
- Minimum insurance: change the `200` constant used when declaredValue > 0.

### Example calculations
- **Example A (small, light package):**
	- weight = 1.5 kg, length=30 cm, width=20 cm, height=10 cm, declaredValue = 0
	- volumetric = (30*20*10)/5000 = 1.2 kg
	- effectiveWeight = max(1.5, 1.2) = 1.5 → ceil(1.5) = 2 kg
	- weightCharge = 2 * 200 = ₦400
	- baseDelivery (Smart Ride) = ₦500 → baseRate = 500 + 400 = ₦900
	- insurance = 0 (declaredValue = 0)
	- total = ₦900

- **Example B (bulky, low mass):**
	- weight = 0.5 kg, length=100 cm, width=50 cm, height=40 cm, declaredValue = 5000
	- volumetric = (100*50*40)/5000 = 40 kg
	- effectiveWeight = max(0.5, 40) = 40 → ceil(40) = 40 kg
	- weightCharge = 40 * 200 = ₦8,000
	- baseDelivery (Smart Ride) = ₦500 → baseRate = 500 + 8,000 = ₦8,500
	- insurance = max(round(5000 * 0.01) = 50, 200) => ₦200 (minimum applies)
	- total = ₦8,700

### Front-end & UI notes
- The summary UI displays `Base Rate`, `Insurance`, and `Total` together in a single background container with a separator. The Total is emphasized and colored `#00B75A`.
- Back button on the summary sets `currentStep` back to `'form'` so users can edit package inputs — it uses a native `<button>` with `text-[#1E1E1E]` for correct color rendering.
- The pickup/delivery cards use decorative scalloped SVG edges implemented in the summary markup. There are two implementations present in the file history: mask-based and path-based. The current file uses a scalloped mask implementation; you can switch to the path-based approach if needed.

### Testing & verification
- Start the dev server:
	```powershell
	npm run dev
	```
- Steps to verify pricing:
	1. Fill out `Weight`, `Length`, `Width`, `Height`, and `Declared Value` on the Package Information form.
	2. Click `Review Summary`.
	3. Inspect Base Rate, Insurance and Total values on the summary page.
	4. Click `Back` to return to the Package Information and change values to confirm pricing updates.

### Edge cases & recommendations
- Negative or non-numeric inputs are treated as 0.
- If you want insurance to be optional, add a checkbox to toggle insurance calculation, or add a configurable minimum.
- Consider exposing the per-kg rate, volumetric divisor and minimum insurance as configuration at the top of the file or in an environment variable for easier adjustments without code changes.

### Next steps I can help with
- Add unit tests for `calculateTotal()` to validate pricing across many scenarios.
- Add debug UI on the summary page to show the `details` object for troubleshooting.
- Move pricing constants to a single config object exported from a new `config/pricing.ts` file.

*** End of SmartRide pricing & logic docs ***
