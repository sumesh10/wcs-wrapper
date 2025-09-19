export interface MemberAttributeResponse {

  data: {
    attributeName: string;
    value:  boolean | null| number | string;
  };
  status: "error" | "success";  
  
}