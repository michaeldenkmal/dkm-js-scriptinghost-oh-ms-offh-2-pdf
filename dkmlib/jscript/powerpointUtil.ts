/**
 * Created by michael on 15.06.2015.
 */
///<reference path="JScript.d.ts" />
///<reference path="jscriptUtil.ts" />
///<reference path="officeUtil.ts" />
import jscriptUtil = require("./jscriptUtil");
import officeUtil = require("./officeUtil");

export var PpFixedFormatType = {
    ppFixedFormatTypePDF: 2,//	PDF format
    ppFixedFormatTypeXPS: 1 //	XPS format
};
export var PpFixedFormatIntent = {
    ppFixedFormatIntentPrint:2, //	Intent is to print exported file.
    ppFixedFormatIntentScreen:1//	Intent is to view exported file on screen.
};

export var PpPrintHandoutOrder = {
    ppPrintHandoutHorizontalFirst:2 , //	Slides are ordered horizontally, with the first slide in the upper-left corner and the second slide to the right of it. If your language setting specifies a right-to-left language, the first slide is in the upper-right corner with the second slide to the left of it.
    ppPrintHandoutVerticalFirst:1//	Slides are ordered vertically, with the first slide in the upper-left corner and the second slide below it. If your language setting specifies a right-to-left language, the first slide is in the upper-right corner with the second slide below it.
};

export var PpPrintOutputType={
    ppPrintOutputBuildSlides: 7, //  Build Slides
    ppPrintOutputFourSlideHandouts: 8, //   Four Slide Handouts
    ppPrintOutputNineSlideHandouts: 9, //  Nine Slide Handouts
    ppPrintOutputNotesPages: 5, // Notes Pages
    ppPrintOutputOneSlideHandouts: 10, //   Single Slide Handouts
    ppPrintOutputOutline:6, //  Outline
    ppPrintOutputSixSlideHandouts: 4, //Six Slide Handouts
    ppPrintOutputSlides: 1, // Slides
    ppPrintOutputThreeSlideHandouts: 3, //Three Slide Handouts
    ppPrintOutputTwoSlideHandouts:2 // Two Slide Handouts
};

export var PpPrintRangeType={
    ppPrintAll: 1,  // Print all slides in the presentation.
    ppPrintCurrent:3, //Print the current slide from the presentation.
    ppPrintNamedSlideShow:5, //Print a named slideshow.
    ppPrintSelection:2, //Print a selection of slides.
    ppPrintSlideRange:4 //Print a range of slides.
}

export function exportDoc2Pdf (doc, pdfFileName:string) {
    //expression .ExportAsFixedFormat(Path, FixedFormatType, Intent, FrameSlides, HandoutOrder, OutputType, PrintHiddenSlides, PrintRange, RangeType, SlideShowName, IncludeDocProperties, KeepIRMSettings)
    doc.SaveAs (pdfFileName, 32);
}

//public static mspub.Document openDoc(mspub.Application app, string docPath)
export function openDoc(app, docPath:string):any{
//    return app.Open(docPath, false, false);
    return app.Presentations.Open(docPath);
}


export function getOrOpenDoc(app:any,  docPath:string ):any
{
    return officeUtil.getOrOpenDoc(app, docPath,  {
        collDocs:app.Presentations,
        fnOpenDoc:openDoc
    });
}



