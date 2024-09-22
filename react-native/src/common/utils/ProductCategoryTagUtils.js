import { Colors } from "../presentation/styles/CommonStyle";

export const ProductCategoryTagInfo = [
  {label: 'Unknown', backgroundColor: Colors.Text, labelColor: Colors.BG},
  {label: 'Cupboard', backgroundColor: Colors.Element, labelColor: Colors.Text},
  {label: 'Fridge', backgroundColor: Colors.Fridge, labelColor: Colors.Text},
  {label: 'Freezer', backgroundColor: Colors.Freezer, labelColor: Colors.Text}
];

export const ProductTag = {
  Unknown: 0,
  Cupboard: 1,
  Fridge: 2,
  Freezer: 3
};