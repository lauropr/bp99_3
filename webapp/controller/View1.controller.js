sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
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
                               
            },

            aoPesquisar: function(oEvent){

                // add filter for search
                var aFilters = []; //monta um array
                var sQuery = oEvent.getParameter("newValue");
                if (sQuery && sQuery.length > 0) {
                    //declara o objeto de filtro
                    var oFilter = new Filter({
                        filters: [
                            new Filter({
                                path: "NomeCompleto",
                                operator: FilterOperator.Contains,
                                value1: sQuery            
                            }),
                            new Filter({
                                path: "Id",
                                operator: FilterOperator.Contains,
                                value1: sQuery            
                            })
                        ],
                        and: false
                      });

                      aFilters.push(oFilter); //appenda uma nova linha para o array de filtros
                    }

                // update list binding
                var oList = this.byId("parceiros");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            }
        });
    });
