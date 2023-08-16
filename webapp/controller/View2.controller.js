sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("bp.bp99.controller.View2", {
            onInit: function () {

                this.getOwnerComponent().getModel().setDefaultBindingMode("TwoWay");

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

                // oView.bindElement(sCaminhoDoRead);
                oView.bindElement({
                    path: sCaminhoDoRead,
                    parameters: {
                        expand: "to_enderecos"
                    }
                });
            },

            aoEditar: function(oEvent){
                
                let oVisibilidade = this.getOwnerComponent().getModel("visibilidade");
                let oModo         = this.getOwnerComponent().getModel("modo");

                oVisibilidade.setProperty("/visualizacao", false);
                oVisibilidade.setProperty("/edicao", true);
                oModo.setProperty("/edicao", true);


            },

            aoCancelar: function(oEvent){

                let oVisibilidade = this.getOwnerComponent().getModel("visibilidade");
                let oModo         = this.getOwnerComponent().getModel("modo");

                oVisibilidade.setProperty("/visualizacao", true);
                oVisibilidade.setProperty("/edicao", false);
                oModo.setProperty("/edicao", false);

                let oModel = this.getOwnerComponent().getModel();
                oModel.resetChanges();


            },

            aoSalvar: function(oEvent){

                //Buscar os dados da tela (que estão no modelo)
                this.oInformacoesParceiro = { };

                var oParceiro = this.getView().getBindingContext().getObject();
                var oEndereco = this.getView().getBindingContext().getProperty("to_enderecos");
                this.oInformacoesParceiro.PartnerId = oParceiro.Id;
                this.oInformacoesParceiro.PartnerType = "2";
                this.oInformacoesParceiro.Street = oEndereco.StreetName;
                this.oInformacoesParceiro.HouseNumber = oEndereco.HouseNumber;
                this.oInformacoesParceiro.District = oEndereco.District;
                this.oInformacoesParceiro.City = oEndereco.CityName;
                this.oInformacoesParceiro.Region = oEndereco.Region;
                this.oInformacoesParceiro.Country = oEndereco.Country;
                this.oInformacoesParceiro.Zipcode = oEndereco.PostalCode;

                let oModel = this.getOwnerComponent().getModel();

                oModel.sDefaultUpdateMethod = "PUT";

                //habilita chamadas update e create
                oModel.setHeaders({'X-Requested-With': 'X'});

                let sCaminhoDoUpdate = oModel.createKey("/Parceiros", {
                    PartnerId: oParceiro.Id
                });

                oModel.update( sCaminhoDoUpdate, this.oInformacoesParceiro, 
                    {
                        //declaração de uma função de sucesso no padrão arrow function para a propriedade success
                        success: (oResult) => {
                            MessageToast.show("Dados atualizados com sucesso para o parceiro " + this.oInformacoesParceiro.PartnerId );

                            let oVisibilidade = this.getOwnerComponent().getModel("visibilidade");
                            let oModo         = this.getOwnerComponent().getModel("modo");
            
                            oVisibilidade.setProperty("/visualizacao", true);
                            oVisibilidade.setProperty("/edicao", false);
                            oModo.setProperty("/edicao", false);
            
                        },

                        //declaração de uma função de erro no padrão arrow function para a propriedade error
                        error: (oError) => {
                            MessageToast.show(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);                            
                        }
                    }
                );











                //Efetuar a chamada de atualização para o SAP

            }

        });
    });
