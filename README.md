# eCommerce Coder

An application built in ReactJS with Typescript and Firebase to create purchase orders based on a list of products/items that can be added.

## Usage
In the Main page the user will see the entire list of products available to buy, each with its own stock amount. In the NavBar an option to navigate based on categories can be found. After some items are selected, the list of all selected items will be found in the Cart view, where you can delete some particular one, or create the order. 

## Login
Using Google Authenticator, and private routes to secure all routes that need a logged in user. This information is stored in a context, so it is shared across the application to be used where needed.

## Item Creation
In the "Add new item" view, users can add new items to sell. The form is created with the Formic library, and validations were added with the Yup library.

## Cart
The cart information is stored in a context, and shared with all the tree. 

## Styles
All styles were created mannually, using Styled Components.
