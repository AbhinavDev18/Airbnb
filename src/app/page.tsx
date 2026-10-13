import { readFile } from "node:fs/promises";
import path from "node:path";

const developerImageNumbers = [
  "01", "02", "03", "04", "05", "06", "08", "09", "10", "11",
  "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
  "22", "23", "24", "25", "26", "27", "28", "29", "30", "31",
  "32", "33", "34", "35", "36", "37", "38", "39", "40", "41",
];

const developerImageUrl = (imageNumber: string) =>
  `https://raw.githubusercontent.com/jaiminbhatt0102/playpower-labs-airbnb-clone/main/public/images/image%20-%20${imageNumber}.jpeg`;

/**
 * The user-provided capture is the visual source of truth.  Keeping it as an
 * artifact, rather than retyping it into components, preserves its exact DOM,
 * class names, image references, and measured CSS.
 */
async function readReferenceCapture() {
  const document = await readFile(
    path.join(process.cwd(), "whole_html.html"),
    "utf8",
  );

  const style = document.match(/<style>([\s\S]*?)<\/style>/i)?.[1];
  const rootStart = document.indexOf('<div id="root">');
  const styleStart = document.indexOf("<style>");
  const rootEnd = document.lastIndexOf("</div>", styleStart);

  if (!style || rootStart === -1 || rootEnd === -1) {
    throw new Error("The reference HTML capture is missing its page markup or CSS.");
  }

  // The developer-provided asset folder intentionally has no image 07. Map
  // its 40 available files in order and cycle them for the final three
  // gallery slots, so every rendered photo is a valid developer asset.
  const propertySourceMap = new Map<string, string>();
  let nextDeveloperImage = 0;
  const captureMarkup = document
    .slice(rootStart + '<div id="root">'.length, rootEnd)
    .replace(
      /<img class="_yKYFjj"\s+src="\/assets\/images\/ui\/searchbar-house\.png" alt="" aria-hidden="true">/i,
      '<span class="_yKYFjj" aria-hidden="true" style="width:38px;height:38px;margin-left:0;display:grid;place-items:center;flex:0 0 38px;font-family:Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif;font-size:28px;line-height:1">🏡</span>',
    );
  const markupWithDeveloperImages = captureMarkup
    .replace(
      /src="(\/assets\/images\/[0-9a-f-]+\.jpeg)"/gi,
      (attribute, source: string) => {
        const existingImageUrl = propertySourceMap.get(source);
        if (existingImageUrl) return `src="${existingImageUrl}"`;

        const imageNumber =
          developerImageNumbers[nextDeveloperImage % developerImageNumbers.length];
        nextDeveloperImage += 1;
        const imageUrl = developerImageUrl(imageNumber);
        propertySourceMap.set(source, imageUrl);
        return `src="${imageUrl}"`;
      },
    );

  return {
    style,
    markup: markupWithDeveloperImages,
  };
}

export default async function Page() {
  const { style, markup } = await readReferenceCapture();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
