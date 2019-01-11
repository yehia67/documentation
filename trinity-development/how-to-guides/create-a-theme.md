# Create a theme

**A theme consists of a color scheme that's used in the user interface of the mobile and desktop versions of Trinity.**

1. From your trinity-wallet directory, go to `src/shared/themes/themes`

All themes are located in separate js files at //.

WIP: Color meaning and usage
The color scheme consists of following mandatory sets and colors:

body, bar - base color sets used for the application and secondary navigation. Both sets have three colors required:
color - required, the body color. Used for text, icons.
bg - required, the background color.
alt - required, accent color used for info block background, dividers and borders.
primary, secondary, positive, negative, highlight, extra - accent color sets used by their name meaning. Possible colors to be defined:
color - required; the accent color itself.
hover - required; the accent colors hover state.
body - optional; used for content when the accent color is it's background. Defaults to body.color.
input - colors for input elements:
color - required; text color of input elements
bg - required; background color of input elements
alt - optional; used for icons and links inside input elements. Defaults to input.color.
label - input element label color:
color - required; label color
hover - required; active input element label color
chart.color - required; chart line color.
WIP: Styleguide
When updating or creating a new UI component or theme, it should be checked for contrast and readability against the Styleguide containing all main UI elements.

To launch the styleguide, inside wallets root directory run:

yarn run start:styleguide