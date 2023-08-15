sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("bp.bp99.controller.View1", {
            onInit: function () {

            },

            aoPressionarItem: function(oEvent){
                //acessa o contexto do clique
                let oContextoDoItemClicado = oEvent.getSource().getBindingContext();

                //acessa o objeto clicado
                let oObjetoClicado = oEvent.getSource().getBindingContext().getObject();

                //acessa o Id do objeto
                let sId = oObjetoClicado.Id;

                //acessa o Component.js através do getOwnerComponent()
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("detalhe", { parceiro : sId });
                
                
            }


        });
    });
