## 1. Preparation

- [x] 1.1 Verify `.env.local` contains `RESEND_API_KEY`, `RESEND_FROM`, and `CONTACT_TO_EMAIL`
- [x] 1.2 Identify the commented-out Resend logic in `apps/web/app/contact/actions.ts`

## 2. Implementation

- [x] 2.1 Refactor `submitContactForm` to remove `formsubmit.co` logic
- [x] 2.2 Re-enable and adapt Resend integration using the `resend` SDK
- [x] 2.3 Ensure error responses from Resend are correctly mapped to `SubmitState`

## 3. Verification

- [x] 3.1 Run `npm run dev` in `apps/web`
- [ ] 3.2 Manually test form submission on `/contact` page
- [ ] 3.3 Verify success message or correct error handling
