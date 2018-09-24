<template>
      <div class="uk-section" uk-height-viewport="offset-top: true">
        <div class="uk-child-width-1-2@m uk-grid-small uk-grid-match uk-text-small" uk-grid>
          <div class="uk-width-1-3@m">
             <div class="uk-card uk-card-body uk-text-left uk-placeholder">
              <form @submit.prevent="checkDadata(result), checkForm()">
                <fieldset class="uk-fieldset">
                    <legend class="uk-legend uk-text-lead uk-text-small uk-text-bold uk-text-center">Заполните поля формы</legend>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Фамилия, имя и отчество" v-model.lazy="result.fio">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Телефон" v-model.lazy="result.sourcePhone">
                    </div>
                    <div class="uk-margin">
                        <vuesuggestions :model.sync="result.sourceAddr" :options="suggestionOptions" class="uk-input" type="text" placeholder="Адрес места проживания">
                        </vuesuggestions>
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Серия и номер паспорта" v-model.lazy="result.sourcePassport">
                    </div>
                    <div class="uk-margin">
                     <div uk-grid class="uk-child-width-1-1@m uk-grid-small uk-grid-match uk-text-small">
                       <div uk-form-custom="target: true">
                            <input type="file" disabled>
                            <input class="uk-input" type="text" placeholder="Выберите фотографию" disabled>
                        </div>
                     </div>
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="ИНН Физического Лица (ИННФЛ)" v-model.lazy="result.INN" disabled>
                    </div>
                    <div>
                      <button class="uk-button uk-button-default uk-width-1-1">Проверить</button>
                    </div>
                </fieldset>
              </form>
                <div class="uk-margin">
                      <button class="uk-button uk-button-primary uk-width-1-1" @click="checkResult(), messages"
                      :disabled="!translit.engname || people.qc === 1 || !phone.phone || phone.qc === 1 || phone.qc === 3">Сохранить</button>
                      <vk-notification position="top-right" :messages.sync="messages"></vk-notification>
                </div>
             </div>
          </div>
          <div class="uk-width-expand@m">
          <div class="uk-child-width-1-1@m uk-grid-small uk-grid-match uk-text-small" uk-grid>
              <div>
                  <div class="uk-card uk-card-body uk-text-left uk-placeholder">
                    <div class="uk-width-auto">
                        <div uk-grid class="uk-child-width-1-1@m uk-grid-small uk-grid-match">
                          <div class="uk-width-auto@s">
                              <div class="uk-card uk-card-body uk-padding-remove uk-flex-middle uk-flex uk-flex-center">
                                <img class="uk-border-circle" src="../../images/avatar.png" width="100" height="100">
                              </div>
                          </div>
                          <div class="uk-width-expand@s">
                              <div class="uk-card uk-card-body uk-text-left uk-flex-middle uk-flex uk-flex-center uk-padding-remove">
                                <span class="uk-text-uppercase uk-text-small">{{ people.result }}</span>
                              </div>
                          </div>
                        </div>
                    </div>
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Фамилия: </span>{{ people.surname }}</li>
                      <li><span class="uk-text-bold">Имя: </span>{{ people.name }}</li>
                      <li><span class="uk-text-bold">Отчество: </span>{{ people.patronymic }}</li>
                      <li v-if="people.gender === 'М'"><span class="uk-text-bold">Пол: </span>Мужской</li>
                      <li v-else-if="people.gender === 'Ж'"><span class="uk-text-bold">Пол: </span>Женский</li>
                      <li v-else><span></span></li>
                      <li v-if="people.qc === 1">
                        <span class="uk-text-danger uk-text-bold ">Требуется ручная проверка записи</span>
                      </li>
                      <li><span class="uk-text-bold">Полное имя пользователя ISO-9: </span><span class="uk-text-capitalize">{{ translit.engname }}</span></li>
                      <li><span class="uk-text-bold">Учетная запись для компьютера: </span>{{ translit.ad }}</li>
                      <li><span class="uk-text-bold">Учетная запись для почты: </span>{{ translit.email }}</li>
                      <li v-if="translit.error">
                        <span class="uk-text-danger uk-text-bold">{{ translit.error }}</span>
                      </li>
                    </ul>
                    <!-- <span uk-icon="icon: credit-card; ratio: 1" class="uk-text-primary"></span> -->
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Серия: </span>{{ passport.series }}</li>
                      <li><span class="uk-text-bold">Номер: </span>{{ passport.number }}</li>
                      <li>
                        <span class="uk-text-bold">Статус документа: </span>
                        <span v-if="passport.qc === 10" class="uk-text-danger uk-text-bold">Недействительный паспорт</span>
                        <span v-if="passport.qc === 0">Действительный паспорт</span>
                      </li>
                      <li v-if="passport.qc === 1"><span class="uk-text-danger uk-text-bold">Требуется ручная проверка записи</span></li>
                    </ul>
                    <!-- <span uk-icon="icon: phone; ratio: 1" class="uk-text-primary"></span> -->
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Номер телефона: </span>{{ phone.phone }}</li>
                      <li><span class="uk-text-bold">Тип: </span>{{ phone.type }}</li>
                      <li><span class="uk-text-bold">Оператор: </span>{{ phone.provider }}</li>
                      <li v-if="phone.qc === 1 || phone.qc === 3"><span class="uk-text-danger uk-text-bold">Требуется ручная проверка записи</span></li>
                    </ul>
                    <!-- <span uk-icon="icon: home; ratio: 1" class="uk-text-primary"></span> -->
                    <ul class="uk-list">
                      <li><span class="uk-text-bold">Адрес: </span>{{ address.result }}</li>
                      <li><span class="uk-text-bold">Индекс: </span>{{ address.postal_code }}</li>
                      <li><span class="uk-text-bold">Округ: </span>{{ address.city_area }}</li>
                      <!-- <li class="uk-text-muted"><span>Широта: </span> {{ address.geo_lat }}</li>
                      <li class="uk-text-muted"><span>Долгота: </span> {{ address.geo_lon }}</li>
                      <li v-if="address.qc === 1 || address.qc === 3"><span class="uk-text-danger uk-text-bold">Требуется ручная проверка записи</span></li>
                      <li v-if="address.source"><span class="uk-text-muted">Ближайшие станции метро: </span>
                        <ul class="uk-list uk-text-muted">
                          <li>{{ address.metro[0].name }} ({{ address.metro[0].distance }} км.)</li>
                          <li>{{ address.metro[1].name }} ({{ address.metro[1].distance }} км.)</li>
                          <li>{{ address.metro[2].name }} ({{ address.metro[2].distance }} км.)</li>
                        </ul>
                      </li> -->
                    </ul>
                  </div>
              </div>
          </div>
          <!-- HACK: Для тестирования -->
          <!-- <div class="uk-margin">
              <div class="uk-margin uk-text-left">
                <label v-if="result.fio">ФИО: </label>
                <span>{{ result.fio }}</span>
              </div>
              <div class="uk-margin uk-text-left">
                <label v-if="result.sourceAddr">Адрес: </label>
                <span>{{ result.sourceAddr }}</span>
              </div>
              <div class="uk-margin uk-text-left">
                <label v-if="result.sourcePhone">Телефон: </label>
                <span>{{ result.sourcePhone }}</span>
              </div>
              <div class="uk-margin uk-text-left" v-if="result.fio || result.sourceAddr || result.sourcePhone">
                <label v-if="result">JSON запрос: </label>
                <span>{{ result }}</span>
              </div>
          </div> -->
          </div>
        </div>
      </div>
</template>

<script>
import fetchDadata from '@/services/fetchDadata'
import fetchTranslit from '@/services/fetchTranslit'
import pushData from '@/services/pushData'
import vuesuggestions from 'vue-suggestions'
export default {
  data () {
    return {
      translit: {},
      answer: null,
      people: [],
      address: [],
      phone: [],
      passport: [],
      count: 0,
      messages: [],
      result: {
        fio: null,
        sourceAddr: null,
        sourcePhone: null,
        sourcePassport: null
      },
      // Подсказка по вводимому адресу
      suggestionOptions: {
        token: '5a8384a27f0726feddd97ead2d6029cf9f79e03a',
        type: 'ADDRESS',
        scrollOnFocus: true,
        triggerSelectOnBlur: true,
        triggerSelectOnEnter: false,
        addon: 'none',
        onSelect (suggestion) {
        }
      }
    }
  },
  methods: {
    async checkDadata () {
      this.error = null
      try {
        console.log(this.result)
        this.answer = (await fetchDadata.post(this.result)).data
        this.people = this.answer.data[0][0]
        this.address = this.answer.data[0][1]
        this.phone = this.answer.data[0][2]
        this.passport = this.answer.data[0][3]
        this.translit = (await fetchTranslit.post(this.result)).data
        console.log(this.translit)
      } catch (error) {
        console.log(error)
      }
    },
    async checkResult () {
      var checkresult = {
        surname: this.people.surname,
        name: this.people.name,
        patronymic: this.people.patronymic,
        gender: this.people.gender,
        phone: this.phone.phone,
        phoneType: this.phone.type,
        phoneProvider: this.phone.provider,
        fullEng: this.translit.engname,
        fullRus: this.people.result,
        ad: this.translit.ad,
        email: this.translit.email
      }
      if (this.translit.engname) {
        console.log(checkresult)
        try {
          this.messages.push((await pushData.post(checkresult)).data.message)
          // <!-- HACK: Для тестирования -->
          // console.log(this.messages)
          this.result.fio = this.result.sourcePhone = ''
          this.people = this.phone = this.translit = ''
        } catch (error) {
          this.messages.push(error.response.data.message)
          // <!-- HACK: Для тестирования -->
          // console.log(this.messages)
        }
        // FIXME: Переход осуществляется быстрее чем выводиться нотификация о сохранение
        // this.$router.push({name: 'root'})
      }
    },
    checkForm: function (e) {
      if (this.result.fio && this.result.sourcePhone) {
        return true
      }
      if (!this.result.fio) {
        this.messages.push('Для сохранения данных требуется указать фамилию, имя и отчество.')
      }
      if (!this.result.sourcePhone) {
        this.messages.push('Для сохранения данных требуется указать телефон.')
      }
    }
  },
  components: { vuesuggestions }
}
</script>
