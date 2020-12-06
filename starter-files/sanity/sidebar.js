import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

const SideBar = () =>
  S.list()
    .title(`Derrick's Slices`)
    .items([
      // create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🏡</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default SideBar;
