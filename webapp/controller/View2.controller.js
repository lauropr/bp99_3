sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("bp.bp99.controller.View2", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter();
                
                //acessa a classe Route (através do getRoute())
                //vincula uma função existente dentro do meu próprio controller e passa o controller como contexto para ter acesso
                //às informações
                oRouter.getRoute("detalhe").attachPatternMatched(this._aoNavegarParceiro, this);

            },

            _aoNavegarParceiro(oEvent){
                
                //busca o id do parceiro
                let sId = oEvent.getParameter("arguments").parceiro.toString(); 
                
                let oModel = this.getOwnerComponent().getModel();

                //monta o caminho do read com a chave resgatada
                let sCaminhoDoRead = oModel.createKey("/ZACAD99_PARCEIROS", { Id: sId });

                //Resgatar a view e fazer a vinculação dos dados através do bindElement
                let oView = this.getView();
                oView.bindElement(sCaminhoDoRead);






            }



        });
    });
