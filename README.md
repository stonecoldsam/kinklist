# Kinklist

An interactive web-based kinklist tool for creating and sharing preferences.

## About

This is a fork of [adhesivecheese's kinklist](https://github.com/adhesivecheese/kinklist) with improvements and bug fixes.

### Original Author
- **adhesivecheese** - [GitHub](https://github.com/adhesivecheese)

### Modified By
- **saustinlabs** - [GitHub](https://github.com/saustinlabs)

## Improvements in This Fork

- ✅ **Replaced Imgur upload with direct download** - No API keys needed, more privacy-friendly
- ✅ Fixed export button infinite loading bug (jQuery error handler)
- ✅ Added list type preservation in URL hash (classic/detailed/plsno)
- ✅ Fixed hash restoration to properly load saved selections
- ✅ Improved error handling for file loading and API calls
- ✅ Added username validation and trimming
- ✅ Fixed critical Math.max/Math.ceil bug in hash decoding
- ✅ Added bounds checking for selection values
- ✅ Added loading states for list type changes
- ✅ Better error messages and console logging
- ✅ Modern download functionality with user feedback

## Usage

1. Select your preferred list type (Classic, Detailed, or Please Don't)
2. Click through each kink category and select your preference level
3. Your selections are automatically saved to the URL hash
4. Click "Download Image" to save a PNG image to your computer
5. Share the image however you like - upload to Discord, Imgur, or any other platform

## Hosting on GitHub Pages

To host this yourself:

1. Fork this repository
2. Go to Settings → Pages
3. Select your branch (master/main) as the source
4. Your site will be live at `https://yourusername.github.io/kinklist/`

## License

This project maintains the original license from adhesivecheese's version.

## Contributing

Feel free to submit issues or pull requests for additional improvements.
