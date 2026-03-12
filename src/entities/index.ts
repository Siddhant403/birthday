/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: lovecards
 * Interface for LoveCards
 */
export interface LoveCards {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reasonText?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  cardThemeColor?: string;
  /** @wixFieldType text */
  associatedMemorySnippet?: string;
  /** @wixFieldType boolean */
  isSpecial?: boolean;
  /** @wixFieldType date */
  creationDate?: Date | string;
}


/**
 * Collection ID: lovestorychapters
 * Interface for LoveStoryChapters
 */
export interface LoveStoryChapters {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  chapterTitle?: string;
  /** @wixFieldType text */
  chapterContent?: string;
  /** @wixFieldType number */
  chapterOrder?: number;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
}


/**
 * Collection ID: photogallery
 * Interface for PhotoGallery
 */
export interface PhotoGallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType date */
  dateTaken?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  momentDescription?: string;
}
