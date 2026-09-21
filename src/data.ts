export const BASE='https://airbnb-clone-umber-two.vercel.app/assets/images';
const p=(path:string)=>`/assets/images/${path}`;
export const photos=[
 ['2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg','Living room 1','Living room'],
 ['090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg','Living room 2','Living room'],
 ['9be71047-fc52-438a-9270-75cb470f6752.jpeg','Full kitchen','Dining & kitchen'],
 ['67c61c6f-6260-4809-9510-0360e58a345d.jpeg','Bedroom','Bedroom'],
 ['c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg','Full bathroom','Bathroom'],
 ['a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg','Living room 1','Living room'],
 ['a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg','Living room 1','Living room'],
 ['f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg','Living room 1','Living room'],
 ['f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg','Living room 2','Living room'],
 ['34529829-a971-44d3-ac2f-90ea3678a34d.jpeg','Living room 2','Living room'],
 ['153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg','Living room 2','Living room'],
 ['3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg','Living room 2','Living room'],
 ['56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg','Full kitchen','Dining & kitchen'],
 ['ddc853d7-e658-405c-bedc-8f31106c447e.jpeg','Full kitchen','Dining & kitchen'],
 ['1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg','Bedroom','Bedroom'],
 ['0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg','Bedroom','Bedroom'],
 ['a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg','Bedroom','Bedroom'],
 ['48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg','Bedroom','Bedroom'],
 ['3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg','Bedroom','Bedroom'],
 ['97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg','Full bathroom','Bathroom'],
 ['9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg','Gym','Exterior'],
 ['246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg','Gym','Exterior'],
 ['4fede77d-7a71-446f-89e3-263af937f3fa.jpeg','Gym','Exterior'],
 ['79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg','Gym','Exterior'],
 ['f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg','Gym','Exterior'],
 ['23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg','Exterior','Exterior'],
 ['5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg','Exterior','Exterior'],
 ['608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg','Exterior','Exterior'],
 ['5b856fde-a393-41bf-b373-c9d02e64221f.jpeg','Exterior','Exterior'],
 ['42befad7-fb29-473d-91db-b03e7a544d1d.jpeg','Exterior','Exterior'],
 ['929545d3-e241-46c0-8a70-c24531ce7b54.jpeg','Exterior','Exterior'],
 ['8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg','Exterior','Exterior'],
 ['cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg','Exterior','Exterior'],
 ['30ad93b2-293f-494d-b645-626303c6cb93.jpeg','Exterior','Exterior'],
 ['9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg','Exterior','Exterior'],
 ['b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg','Exterior','Exterior'],
 ['dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg','Exterior','Exterior'],
 ['fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg','Exterior','Exterior'],
 ['3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg','Exterior','Exterior'],
 ['862d936c-0f34-4e50-af87-b519e2781d19.jpeg','Exterior','Exterior'],
 ['79addceb-8c2d-419b-80ff-e29af426a94c.jpeg','Exterior','Exterior'],
].map(([file,alt,category])=>({file,alt,category,url:p(file)}));

export const hero=photos.slice(0,5);

export const reviews=[
 ['Amit','2 months on Airbnb','1 week ago','Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.','rev1.jpeg'],
 ['Aheesh','3 years on Airbnb','2 weeks ago','We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.','rev2.jpeg'],
 ['Samiksha','8 months on Airbnb','May 2026','the host nitish was really great help','rev3.jpeg'],
 ['Vedant','4 years on Airbnb','May 2026','We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained. The highlight of our stay was definitely the jacuzzi.','rev4.jpeg'],
 ['Vaibhav S','3 years on Airbnb','May 2026','Great great experience living out there , can’t expect more , will always look for it in the future and will recommend my friends too.','rev5.jpeg']
].map(([name,years,date,text,avatar])=>({name,years,date,text,avatar:p(`avatars/${avatar}`)}));

export const amenities=['Kitchen','Wifi','Dedicated workspace','Free parking on premises','Pool','Hot tub','Pets allowed','Exterior security cameras on property','Carbon monoxide alarm','Smoke alarm'];

export const ratingBreakdown = [
  { name: 'Cleanliness', rating: '5.0', pct: '100%' },
  { name: 'Accuracy', rating: '5.0', pct: '100%' },
  { name: 'Check-in', rating: '5.0', pct: '100%' },
  { name: 'Communication', rating: '5.0', pct: '100%' },
  { name: 'Location', rating: '4.8', pct: '96%' },
  { name: 'Value', rating: '4.8', pct: '96%' },
];

export const sleepCards = [
  { title: 'Bedroom', subtitle: '1 double bed', image: p('67c61c6f-6260-4809-9510-0360e58a345d.jpeg') },
  { title: 'Living room', subtitle: '1 sofa', image: p('a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg') },
];
