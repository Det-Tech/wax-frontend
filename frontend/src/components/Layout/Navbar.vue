<template>
    <!-- Navbar-->
        <b-navbar fixed="bottom" toggleable="md">
            <b-navbar-nav class="w-100 d-flex">
                <!-- Left aligned - Button to show gameplay Modal -->
                <b-button class="purple-btn how-to-btn font-weight-bold mt-1" @click="() => showModal('showHowToModal')">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M6.24992 12.5H43.7499C46.0416 12.5 47.9166 14.375 47.9166 16.6667V33.3333C47.9166 35.625 46.0416 37.5 43.7499 37.5H6.24992C3.95825 37.5 2.08325 35.625 2.08325 33.3333V16.6667C2.08325 14.375 3.95825 12.5 6.24992 12.5ZM16.6666 27.0833H22.9166V22.9167H16.6666V16.6667H12.4999V22.9167H6.24992V27.0833H12.4999V33.3333H16.6666V27.0833ZM32.2916 31.25C30.5624 31.25 29.1666 29.8542 29.1666 28.125C29.1666 26.3958 30.5624 25 32.2916 25C34.0208 25 35.4166 26.3958 35.4166 28.125C35.4166 29.8542 34.0208 31.25 32.2916 31.25ZM37.4999 21.875C37.4999 23.6042 38.8958 25 40.6249 25C42.3541 25 43.7499 23.6042 43.7499 21.875C43.7499 20.1458 42.3541 18.75 40.6249 18.75C38.8958 18.75 37.4999 20.1458 37.4999 21.875Z" fill="white"/>
                    </svg>

                    <p>Gameplay</p>
                </b-button>
                <!-- Remaining credits -->
                <div class="nav-game-info">
                    <div class="nav-game-info-row" @click="() => showModal('showHiddenEOSModal')">
                        <h5>HIDDEN EOS</h5>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 347.113 347.113" style="enable-background:new 0 0 347.113 347.113;" xml:space="preserve"><g><g>
                                <g>
                                    <path d="M171.647,2.874L169.3,0L36.582,176.082l-1.414,1.861l142.007,168.378l0.664,0.792l132.685-178.324l1.423-1.853    L171.647,2.874z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
                                </g>
                                </g></g> 
                            </svg>
                            <span>4228</span>
                        </div>
                    </div>
                    <div class="nav-game-info-row">
                        <h5>FUEL REMAINING</h5>
                        <div>
                            <span>15</span>
                        </div>
                    </div>
                </div>
                <!-- Right aligned - Button to trigger buy Modal -->
                 <b-button class="purple-btn buy-btn font-weight-bold mt-1" @click="() => showModal('showBuyClicksModal')">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve" width="512px" height="512px"><g><g>
                        <g>
                            <path d="M352.427,90.24l0.32-0.32L273.28,10.667L250.667,33.28l45.013,45.013c-20.053,7.68-34.347,26.987-34.347,49.707    c0,29.44,23.893,53.333,53.333,53.333c7.573,0,14.827-1.6,21.333-4.48v153.813C336,342.4,326.4,352,314.667,352    c-11.733,0-21.333-9.6-21.333-21.333v-96c0-23.573-19.093-42.667-42.667-42.667h-21.333V42.667C229.333,19.093,210.24,0,186.667,0    h-128C35.093,0,16,19.093,16,42.667V384h213.333V224h32v106.667c0,29.44,23.893,53.333,53.333,53.333    c29.44,0,53.333-23.893,53.333-53.333V128C368,113.28,362.027,99.947,352.427,90.24z M186.667,149.333h-128V42.667h128V149.333z     M314.667,149.333c-11.733,0-21.333-9.6-21.333-21.333s9.6-21.333,21.333-21.333c11.733,0,21.333,9.6,21.333,21.333    S326.4,149.333,314.667,149.333z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
                        </g>
                        </g></g> 
                    </svg>
                    <p>Buy Fuel</p>
                </b-button>
            </b-navbar-nav>
        </b-navbar>
</template>

<script>
export default {
    props: {
        remainingClicks: Number,
        showModal: Function,
    }
}
</script>

<style scoped>

.purple-btn{
    color: #fff;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 20pt;
    width: 100pt;
    border: none;
    box-shadow: -3pt -3pt 3 0 rgba(0,0,0,.25);
}

.purple-btn, .purple-btn:hover{
    background-color: rgb(127 43 209);
}

.purple-btn.how-to-btn svg path{
    height: 25pt;
    width: 50pt;
}

.purple-btn.how-to-btn svg{
    margin-bottom: -10px;
}

.purple-btn.buy-btn svg{
    width: 35pt;
    height: 38pt;
}

.purple-btn p{
    font-size: 15pt;
    width: 100%;
    text-align: center;
    margin: 10px auto 0;
}

.nav-game-info{
    background: #000;
    color: #fff;
    padding: 10pt 30pt 0;
    border: 1px solid #fff;
    border-radius: 10px 10px 0 0;
    border-bottom: none;
    position: relative;
    top: 3px;
    max-width: 220pt
}

.nav-game-info .nav-game-info-row h5{
    text-align: center;
    color: rgba(255, 255, 255, .5);
    font-size: 12pt;
    margin: 0 auto;
}

.nav-game-info .nav-game-info-row:first-of-type{
    margin-bottom: 5px;
    cursor: pointer;
}

.nav-game-info .nav-game-info-row:first-of-type svg{
    width: 15pt;
    height: 20pt;
}

.nav-game-info .nav-game-info-row div{
    display: flex;
    justify-content: center;
    font-size: 22pt;
    margin-top: -5px;
}

.nav-game-info .nav-game-info-row:first-of-type div{
    justify-content: space-between;
    align-items: center;
}

.fixed-bottom{
    bottom: 35px;
}

.fixed-bottom .d-flex{
    justify-content: space-around;
    max-width: 600px;
    margin: 0 auto;
    flex-direction: row !important;
    position: fixed;
    left: 0;
    right: 0;
}

.nav-game-info, 
.purple-btn{
    height: 100pt;
}

@media screen and (max-width: 768px){
    .nav-game-info {
        padding: 10pt 20pt 0
    }
    .nav-game-info .nav-game-info-row div{
        font-size: 16pt;
        margin-top: 0;
    }
    .nav-game-info .nav-game-info-row:first-of-type div{
        margin-bottom: 10px;
    }
    .nav-game-info .nav-game-info-row h5{
        font-size: 10pt;
    }
    .nav-game-info .nav-game-info-row:first-of-type svg{
        width: 12pt;
    }
    .purple-btn.buy-btn svg{
        height: 30pt;
    }
    .purple-btn.how-to-btn svg{
        width: 35pt;
    }
    .purple-btn p{
        font-size: 10pt;
    }
    .navbar {
        padding:0;
    }
    .fixed-bottom .d-flex{
        justify-content: space-evenly;
    }
}

@media screen and (max-width: 500px){

    .purple-btn{
        width: 70pt;
    }
    .nav-game-info, 
    .purple-btn{
        height: 70pt;
    }
    .nav-game-info {
        padding: 10pt;
    }
    .nav-game-info .nav-game-info-row div{
        font-size: 14pt;
    }
    .nav-game-info .nav-game-info-row h5{
        font-size: 8pt;
    }
    .nav-game-info .nav-game-info-row:first-of-type svg{
        width: 10pt;
    }
    .nav-game-info .nav-game-info-row:first-of-type{
        margin-bottom: 2px;
    }
    .nav-game-info .nav-game-info-row:first-of-type div{
        margin-bottom: 0px;
    }
    .purple-btn.buy-btn svg{
        height: 24pt;
    }
    .purple-btn.how-to-btn svg{
        width: 28pt;
        margin-bottom: -15px;
    }
    .purple-btn p{
        font-size: 8pt;
        margin: 10px auto 0;
    }
    .fixed-bottom .d-flex{
        justify-content: space-between;
        bottom: 0;
    }
}

</style>