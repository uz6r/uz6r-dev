## Why

The contact form currently uses `formsubmit.co` as a temporary solution. The user now has a custom domain verified and wants to switch back to Resend for better reliability, branding, and professional email delivery.

## What Changes

- Re-enable Resend integration in the contact form server action.
- Remove the temporary `formsubmit.co` AJAX submission logic.
- Update documentation to reflect that Resend is the primary email provider.

## Capabilities

### New Capabilities

- `contact-form-resend`: Integration of Resend SDK to handle contact form submissions via verified custom domain.

### Modified Capabilities

<!-- None -->

## Impact

- `apps/web/app/contact/actions.ts`: Switch from `fetch` (formsubmit.co) to `resend` SDK.
- `.env.example`: Update instructions for configuring Resend with a custom domain.
