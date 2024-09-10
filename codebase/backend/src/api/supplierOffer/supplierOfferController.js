const supplierOfferController={
    getSinglesupplierOffer:(req,res,next)=>{
        try {
            const supplierOfferId=parseInt(req.params.id, 10)
            if (isNaN(materialReqId)) {
                return res.status(400).json({
                  success: false,
                  message: "Invalid supplier offer ID",
                });
              }
              
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Error - ${error.message}`,
              });  
        }
    },
    getAllsupplierOffer:(req,res,next)=>{},
    createsupplierOffer:(req,res,next)=>{},
    updatesupplier:(req,res,next)=>{},
    updatesupplierOffer:(req,res,next)=>{},
    updatesupplierOfferItem:(req,res,next)=>{},
    deletesupplierOffer:(req,res,next)=>{},
}

export default supplierOfferController