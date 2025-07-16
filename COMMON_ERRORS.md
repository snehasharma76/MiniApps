# Common Errors and Solutions

This document tracks common errors encountered during the development of the Polaroid Carousel Mini App and their solutions.

## Frontend Errors

### Next.js Setup Issues
- **Error**: Failed to initialize Next.js project
- **Solution**: Ensure Node.js is updated to the latest LTS version and run `npx create-next-app@latest` with the appropriate flags

### Tailwind CSS Configuration
- **Error**: Tailwind styles not applying
- **Solution**: Verify that the Tailwind configuration is properly set up in `tailwind.config.js` and that the directives are included in the CSS file

## Image Handling

### Image Upload Issues
- **Error**: Failed to upload or display images
- **Solution**: Check file size limitations and ensure proper handling of file types (JPG, PNG)

### html2canvas Rendering
- **Error**: Blurry or incorrectly rendered images
- **Solution**: Use appropriate scaling factors and ensure all elements are properly loaded before capturing

### html2canvas CSS Color Function Issues
- **Error**: html2canvas fails with errors like "Unsupported color function: oklab" when trying to capture elements with modern CSS color functions
- **Solution**: Replaced html2canvas with direct Canvas API drawing to avoid CSS parsing issues. The new approach directly captures the image from the DOM and draws it onto a canvas with a Polaroid-style frame

## Farcaster Integration

### Connection Issues
- **Error**: Unable to connect to Farcaster
- **Solution**: Verify API keys and connection parameters

### Sharing Failures
- **Error**: Failed to share content to Farcaster
- **Solution**: Ensure content format meets Farcaster requirements and check authentication status

## Base Network Integration

### Connection Errors
- **Error**: Failed to connect to Base network
- **Solution**: Verify network configuration and RPC endpoints

### Wallet Connection Issues
- **Error**: Unable to connect wallet
- **Solution**: Ensure proper wallet interface implementation and error handling

## General Troubleshooting

### Performance Issues
- **Error**: Slow rendering or responsiveness
- **Solution**: Optimize image sizes, reduce unnecessary re-renders, and implement lazy loading

### Mobile Compatibility
- **Error**: Poor display on mobile devices
- **Solution**: Ensure responsive design implementation and test on various screen sizes
