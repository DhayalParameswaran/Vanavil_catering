import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  biriyaniItems,
  vegetableItems,
  fruitItems,
  cookingItems,
  otherItems
} from './items';

import { items } from './newCreatedItems';
import { GroceryItem } from './GroceryItem';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-genearte-bills',
  templateUrl: './genearte-bills.component.html',
  styleUrls: ['./genearte-bills.component.css']
})
export class GenearteBillsComponent {

   private timer: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    
this.authService.checkSession()
    this.timer = setInterval(() => {

      this.authService.checkSession();
     

    }, 60000); // every 1 minute
  }

  ngOnDestroy() {

    clearInterval(this.timer);

  }

  logout() {

    this.authService.logout();

  }

  biriyaniItems: GroceryItem[] = biriyaniItems;
vegetableItems: GroceryItem[] = vegetableItems;
fruitItems: GroceryItem[] = fruitItems;
otherItems: GroceryItem[] = otherItems;
cookingItems: GroceryItem[] = cookingItems;


formdata:any = items;

resultData :any ={};

allItems = [
  ...this.biriyaniItems.map(i => ({ ...i, section: 'biriyaniItems' })),
  ...this.vegetableItems.map(i => ({ ...i, section: 'vegetableItems' })),
  ...this.fruitItems.map(i => ({ ...i, section: 'fruitItems' })),
  ...this.otherItems.map(i => ({ ...i, section: 'otherItems' })),
  ...this.cookingItems.map(i => ({ ...i, section: 'cookingItems' }))
];


hasAtLeastOneValue(): boolean {
  // Loop over all sections
  const sections = [
    this.biriyaniItems,
    this.vegetableItems,
    this.fruitItems,
    this.cookingItems,
    this.otherItems
  ];

  for (const items of sections) {
    for (const item of items) {
      const data = this.formdata[item.key];
      if (data && data.value !== null && data.value !== undefined && data.value !== '') {
        return true; // At least one field has a value
      }
    }
  }

  return false; // All fields are empty
}

buildRequestPayload() {
  const payload: any = {
    biriyaniItems: {},
    vegetableItems: {},
    fruitItems: {},
    cookingItems: {},
    otherItems: {}
  };

  // Helper to populate a section
  const populateSection = (items: any[], sectionName: string) => {

      // add ID if record already exists
    if (this.resultData?.[sectionName]?.id) {
      payload[sectionName].id = this.resultData[sectionName].id;
    }
    
    items.forEach(item => {
      if (this.formdata[item.key]) {
        payload[sectionName][item.key] = JSON.stringify(this.formdata[item.key]);
      }
    });
  };

  populateSection(this.biriyaniItems, 'biriyaniItems');
  populateSection(this.vegetableItems, 'vegetableItems');
  populateSection(this.fruitItems, 'fruitItems');
  populateSection(this.cookingItems, 'cookingItems');
  populateSection(this.otherItems, 'otherItems');

  return payload;
}

submit(){
this.generatePdf();
 
}

async generatePdf() {

  const existingPdfBytes = await fetch('assets/GroceryTemplate.pdf')
    .then(res => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const form = pdfDoc.getForm();

  Object.keys(this.formdata).forEach(key => {

    const item = this.formdata[key];
    if (item?.value != null && item?.value !== '') {

      try {

        // const value = String(item.value);
        // form.getTextField(key)
        //   .setText(` ${value} ${item.unit}  `);

          const field = form.getTextField(key);
const value = String(item.value);
field.setText(` ${value} ${item.unit}  `);

      } catch (error) {

        console.log(`Field not found in PDF: ${key}`);

      }
    }
  });

  // Refresh field appearance
  form.updateFieldAppearances();

  // Optional: convert form fields into normal PDF text
  // Uncomment if you don't want editable fields
  // form.flatten();

  const pdfBytes = await pdfDoc.save();

 const blob = new Blob(
  [new Uint8Array(pdfBytes)],
  { type: 'application/pdf' }
);

  const url = URL.createObjectURL(blob);

// Preview
window.open(url, '_blank');

// Download
const a = document.createElement('a');
a.href = url;
a.download = 'Grocery-Bill.pdf';
a.click();
}

debugValue(key: string, value: any) {
  console.log('Key:', key);
  console.log('Typed Value:', value);
}

disableScroll(event: WheelEvent) {
  (event.target as HTMLInputElement).blur();
}

}
