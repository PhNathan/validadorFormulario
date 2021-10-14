let validator = {
    handleSubmit:(e)=>{
        e.preventDefault();//para o comportamento padrão do form
        let send = true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        for(let i=0;i<inputs.length;i++){
            let input = inputs[i];

           let check =  validator.checkInput(input);
           if(check !== true){
            send = false;
            //exibe erro
            validator.showError(input, check);

           }
        }

        if(send){
            form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let r in rules){
                let rDetails = rules[r].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campos vázios não são permitidos';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo precisa de pelo menos '+ rDetails[1] +' caracteres';
                        }
                        break;
                    case 'email':
                        if (input.value != '') {
                        let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail inválido';
                            }
                        }   
                        break;
                }
            }

        }

        return true;
    },

    showError: (input, error)=>{
        input.style.borderColor = '#FF0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);

    },
    clearErrors: ()=>{
        let inputs = form.querySelectorAll('input');

        for(let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');

        for(let i=0;i <errorElements.length;i++){
            errorElements[i].remove();
            
        }
    }
};
let form = document.querySelector('.validator');// pega o form validator



form.addEventListener('submit', validator.handleSubmit);//adiciona um evento para parar o comportamento prdrão