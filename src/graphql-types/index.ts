/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Activity
// ====================================================

export interface Activity_getObject {
  __typename: 'Object'
  /**
   * The Object id
   */
  _id: string | null
  /**
   * Your Object title
   */
  title: string | null
  content: string | null
  /**
   * Search by Metafield value. Object IDs for Object Metafields (comma separated for multiple)
   */
  metadata: any | null
}

export interface Activity {
  /**
   * Returns a single Object from your Bucket.
   */
  getObject: Activity_getObject | null
}

export interface ActivityVariables {
  slug: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
