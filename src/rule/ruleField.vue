rule: {
  ruletype: '',
  rulename: '',
  departmentAndUser: [
    {
      userId: '',
      avatar: '',
      name: '',
      position: '',
    },
    {
      id: '',
      name: '',
      name_en: '',
    }
  ],
  attendceTime: {
    ruletype: '',
    weekDay: '',
    fixedList: [
      {
        weekDay: '',
        workTime: [
          {
            name: '',
            startTime: '',
            endtime: ''
          },
          {
            name: '',
            startTime: '',
            endTime: ''
          }
        ],
        restTime: {
          name: '',
          startTime: '',
          endTime: ''
        }
      }
    ],
    shiftList: [
      {
        name: '',
        workTime: [
          {
            name: '',
            startTime: '',
            endtime: ''
          },
          {
            name: '',
            startTime: '',
            endTime: ''
          }
        ],
        restTime: {
          name: '',
          startTime: '',
          endTime: ''
        }
      }
    ],
    shiftCycle: [
      {
        name: '',
        cycleList: [
          {
            dayNum: '',
            dayInfo: '',
          },
          {
            dayNum: '',
            dayInfo: '',
          },
          {
            dayNum: '',
            dayInfo: '',
          }
        ]
      },
      {
        name: '',
        cycleList: [
          {
            dayNum: '',
            dayInfo: '',
          },
          {
            dayNum: '',
            dayInfo: '',
          },
          {
            dayNum: '',
            dayInfo: '',
          }
        ]
      }
    ],
    shiftRule: [
      {
        userId: '',
        username: '',
        workInfo: [
          {
            time: '',
            dayInfo: '',
          }
        ]
      }
    ],
    position: [
      {
        latitude: '',
        longitude: '',
        name: '',
        address: '',
        rang: ''
      }
    ],
    overTime: {
      type: '以加班申请为准',
      dayWork: {
        isOver: false,
        maxTime: 240,
        minTime: 60,
        startTime: 30,
        restType: {
          name: '不扣除', // 指定休息时间，按加班时长扣除
          restTime: {
            startTime: '12:00',
            endTime: '13:00'
          },
          deduction: [
            {
              name: '扣除条件1',
              overHour: 300,
              delHour: 30
            }
          ]
        }
      },
      holiday: {
        isOver: false,
        maxTime: 240,
        minTime: 60,
        restType: {
          name: '不扣除', // 指定休息时间，按加班时长扣除
          restTime: {
            startTime: '12:00',
            endTime: '13:00'
          },
          deduction: [
            {
              name: '扣除条件1',
              overHour: 300,
              delHour: 30
            }
          ]
        }
      }
    },
    moreFactor: {
      reportTo: [
        {
          userId: '',
          avatar: '',
          name: '',
          position: '',
        }
      ],
      whitelist: [
        {
          userId: '',
          avatar: '',
          name: '',
          position: '',
        }
      ],
      remind:{
        workRemind: '',
        offWorkRemind: ''
      },
      hspDay: {
        ruletype: '',
        isHolidayClock: false,
        notClockDay: [
          {
            day: '',
            desc: ''
          }
        ],
        clockDay: [
          {
            day:'',
            desc:'',
            workTime: [
              {
                name: '',
                startTime: '',
                endtime: ''
              }
            ]
          }
        ]
      },
      isApplyRcard: true,
      rcardTimeLimit: '不限制',
      rcardCount: 3,
      workBorder: '12:00'
    }
  }
}