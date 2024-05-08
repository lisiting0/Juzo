
const columns = [
  {
    fieldType: 'object',
    objectFieldType: 'boolean',
    booleanOptions: '0国内|1国际',
    enumNamespace: 'AdminService',
    label: '国际国内',
    prop: 'issueFinancialReport',
    objectValue: 'isInternational'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'TicketChannelType',
    enumNamespace: 'AdminService',
    label: '出票渠道',
    prop: 'issueFinancialReport',
    objectValue: 'ticketChannel'
  },
  {
    fieldType: 'object',
    label: '订单类型',
    prop: 'issueFinancialReport',
    objectValue: 'businessMessage'
  },
  {
    fieldType: 'object',
    label: '创建时间',
    prop: 'issueFinancialReport',
    objectValue: 'createTime'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'IssueOrderStatus',
    enumNamespace: 'AdminService',
    label: '出票订单状态',
    prop: 'issueFinancialReport',
    objectValue: 'issueOrderStatus'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'PurchaseOrderStatusType',
    enumNamespace: 'AdminService',
    label: '采购订单状态',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseOrderStatus'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'IssueOrderOriginType',
    enumNamespace: 'AdminService',
    label: '订单来源',
    prop: 'issueFinancialReport',
    objectValue: 'orderOriginType'
  },
  {
    fieldType: 'object',
    label: '订单备注',
    prop: 'issueFinancialReport',
    objectValue: 'remark'
  },
  {
    fieldType: 'object',
    label: '政策员',
    prop: 'issueFinancialReport',
    objectValue: 'policyCreator'
  },
  {
    fieldType: 'object',
    label: '政策代码',
    prop: 'issueFinancialReport',
    objectValue: 'policyCode'
  },
  {
    fieldType: 'object',
    label: '产品类型',
    prop: 'issueFinancialReport',
    objectValue: 'productType'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'ReimbursementType',
    enumNamespace: 'AdminService',
    label: '报销凭证',
    prop: 'issueFinancialReport',
    objectValue: 'reimbursementType'
  },
  {
    fieldType: 'object',
    label: '订单编号',
    prop: 'issueFinancialReport',
    objectValue: 'ticketIssueOrderNo'
  },

  {
    fieldType: 'object',
    label: '成人大pnr',
    prop: 'issueFinancialReport',
    objectValue: 'adultBigPnr'
  },
  {
    fieldType: 'object',
    label: '成人小pnr',
    prop: 'issueFinancialReport',
    objectValue: 'adultSmallPnr'
  },
  {
    fieldType: 'object',
    label: '儿童大pnr',
    prop: 'issueFinancialReport',
    objectValue: 'childBigPnr'
  },
  {
    fieldType: 'object',
    label: '儿童小pnr',
    prop: 'issueFinancialReport',
    objectValue: 'childSmallPnr'
  },
  {
    fieldType: 'object',
    label: '航司信息',
    prop: 'issueFinancialReport',
    objectValue: 'carrierNo'
  },
  {
    fieldType: 'object',
    label: '航司票号',
    prop: 'issueFinancialReport',
    objectValue: 'carrierTicketNo'
  },
  {
    fieldType: 'object',
    label: '乘客名',
    prop: 'issueFinancialReport',
    objectValue: 'passengerName'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'PassengerType',
    enumNamespace: 'AdminService',
    label: '乘客类型',
    prop: 'issueFinancialReport',
    objectValue: 'passengerType'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'GenderType',
    enumNamespace: 'AdminService',
    label: '乘客性别',
    prop: 'issueFinancialReport',
    objectValue: 'gender'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'IdentityCardType',
    enumNamespace: 'AdminService',
    label: '乘客证件类型',
    prop: 'issueFinancialReport',
    objectValue: 'cardType'
  },
  {
    fieldType: 'object',
    label: '乘客证件号',
    prop: 'issueFinancialReport',
    objectValue: 'cardNum'
  },
  {
    fieldType: 'object',
    objectFieldType: 'boolean',
    booleanOptions: '0非GP|1GP',
    label: '是否为gp人员',
    prop: 'issueFinancialReport',
    objectValue: 'isGp'
  },
  {
    fieldType: 'object',
    label: '乘机人手机号码',
    prop: 'issueFinancialReport',
    objectValue: 'phone'
  },
  {
    fieldType: 'object',
    label: '联系人',
    prop: 'issueFinancialReport',
    objectValue: 'contact'
  },
  {
    fieldType: 'object',
    label: '联系人手机号码',
    prop: 'issueFinancialReport',
    objectValue: 'contactPhone'
  },
  {
    fieldType: 'object',
    label: '航程信息',
    prop: 'issueFinancialReport',
    objectValue: 'orderFlight'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'TripType',
    enumNamespace: 'AdminService',
    label: '航程类型',
    prop: 'issueFinancialReport',
    objectValue: 'orderFlightType'
  },
  {
    fieldType: 'object',
    label: '航段数',
    prop: 'issueFinancialReport',
    objectValue: 'segmentCount'
  },
  {
    fieldType: 'object',
    label: '航程名称',
    prop: 'issueFinancialReport',
    objectValue: 'orderFlightDecription'
  },
  {
    fieldType: 'object',
    label: '航班号',
    prop: 'issueFinancialReport',
    objectValue: 'flightNumber'
  },
  {
    fieldType: 'object',
    label: '共享航班号',
    prop: 'issueFinancialReport',
    objectValue: 'actualCarrierFlight'
  },
  {
    fieldType: 'object',
    label: '舱位',
    prop: 'issueFinancialReport',
    objectValue: 'cabinCode'
  },
  {
    fieldType: 'object',
    label: '运价基础',
    prop: 'issueFinancialReport',
    objectValue: 'fareBasic'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'CabinClassType',
    enumNamespace: 'AdminService',
    label: '舱位等级',
    prop: 'issueFinancialReport',
    objectValue: 'cabinLevel'
  },
  {
    fieldType: 'object',
    label: '起飞时间',
    prop: 'issueFinancialReport',
    objectValue: 'departureTime'
  },
  {
    fieldType: 'object',
    label: '到达时间',
    prop: 'issueFinancialReport',
    objectValue: 'arrivalTime'
  },
  {
    fieldType: 'object',
    label: '行程单号',
    prop: 'issueFinancialReport',
    objectValue: 'flightItineraryNo'
  },
  {
    fieldType: 'object',
    label: '行程单打印状态',
    prop: 'issueFinancialReport',
    objectValue: 'flightItineraryPrintStatus'
  },
  {
    fieldType: 'object',
    label: '销售票面价',
    prop: 'issueFinancialReport',
    objectValue: 'originTicketPrice'
  },
  {
    fieldType: 'object',
    label: '销售机建税费',
    prop: 'issueFinancialReport',
    objectValue: 'flightTax'
  },
  {
    fieldType: 'object',
    label: '销售燃油税费',
    prop: 'issueFinancialReport',
    objectValue: 'fuelTax'
  },
  {
    fieldType: 'object',
    label: '销售总税费',
    prop: 'issueFinancialReport',
    objectValue: 'sumTax'
  },
  {
    fieldType: 'object',
    label: '销售票面小计',
    prop: 'issueFinancialReport',
    objectValue: 'sumOriginTicketPrice'
  },
  {
    fieldType: 'object',
    label: '销售价',
    prop: 'issueFinancialReport',
    objectValue: 'soldTicketPrice'
  },
  {
    fieldType: 'object',
    label: '销售政策留钱',
    prop: 'issueFinancialReport',
    objectValue: 'commissionMoney'
  },
  {
    fieldType: 'object',
    label: '销售服务费',
    prop: 'issueFinancialReport',
    objectValue: 'commissionPoint'
  },
  {
    fieldType: 'object',
    label: '销售加价/让利',
    prop: 'issueFinancialReport',
    objectValue: 'markupAmount'
  },
  {
    fieldType: 'object',
    label: '销售保险份数',
    prop: 'issueFinancialReport',
    objectValue: 'insuranceCount'
  },
  {
    fieldType: 'object',
    label: '销售保险总金额',
    prop: 'issueFinancialReport',
    objectValue: 'insuranceAmount'
  },
  {
    fieldType: 'object',
    label: '销售保险结算总金额',
    prop: 'issueFinancialReport',
    objectValue: 'insuranceSettlementAmount'
  },
  {
    fieldType: 'object',
    label: '销售赠送保险份数',
    prop: 'issueFinancialReport',
    objectValue: 'giftInsuranceCount'
  },
  {
    fieldType: 'object',
    label: '销售代收费用',
    prop: 'issueFinancialReport',
    objectValue: 'collectionFees'
  },
  {
    fieldType: 'object',
    label: '销售航司代理费返钱',
    prop: 'issueFinancialReport',
    objectValue: 'refundAirlineAgencyFee'
  },
  {
    fieldType: 'object',
    label: '销售航司代理费返点',
    prop: 'issueFinancialReport',
    objectValue: 'airlineAgencyFeeRebate'
  },
  {
    fieldType: 'object',
    label: '销售票面价留钱',
    prop: 'issueFinancialReport',
    objectValue: 'originTicketPriceLeaveMoney'
  },
  {
    fieldType: 'object',
    label: '销售票面价返点',
    prop: 'issueFinancialReport',
    objectValue: 'originTicketPriceRebate'
  },
  {
    fieldType: 'object',
    label: '销售现返小计',
    prop: 'issueFinancialReport',
    objectValue: 'presentReturn'
  },
  {
    fieldType: 'object',
    label: '销售总价（含保险）',
    prop: 'issueFinancialReport',
    objectValue: 'totalSaleAmountIncludeInsurance'
  },
  {
    fieldType: 'object',
    label: '销售总价（不含保险）',
    prop: 'issueFinancialReport',
    objectValue: 'totalSaleAmountExcludeInsurance'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'TradeStatus',
    enumNamespace: 'AdminService',
    label: '销售支付状态',
    prop: 'issueFinancialReport',
    objectValue: 'tradePayStatus'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'PayChannelType',
    enumNamespace: 'AdminService',
    label: '销售支付方式',
    prop: 'issueFinancialReport',
    objectValue: 'payChannel'
  },
  {
    fieldType: 'object',
    label: '销售应收金额',
    prop: 'issueFinancialReport',
    objectValue: 'amountReceivable'
  },
  {
    fieldType: 'object',
    label: '销售支付手续费',
    prop: 'issueFinancialReport',
    objectValue: 'payChannelFeesAmount'
  },
  {
    fieldType: 'object',
    label: '销售支付金额',
    prop: 'issueFinancialReport',
    objectValue: 'payAmount'
  },
  {
    fieldType: 'object',
    label: '销售收银公司',
    prop: 'issueFinancialReport',
    objectValue: 'cashierCompany'
  },
  {
    fieldType: 'object',
    label: '销售收银部门',
    prop: 'issueFinancialReport',
    objectValue: 'cashierDepartment'
  },
  {
    fieldType: 'object',
    label: '销售收银员',
    prop: 'issueFinancialReport',
    objectValue: 'cashier'
  },
  {
    fieldType: 'object',
    label: '销售支付时间',
    prop: 'issueFinancialReport',
    objectValue: 'finishedTime'
  },
  {
    fieldType: 'object',
    label: '采购票面价',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseTicketPrice'
  },
  {
    fieldType: 'object',
    label: '采购优惠票面',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseDiscountTicketPrice'
  },
  {
    fieldType: 'object',
    label: '采购销售价',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseSalesPrice'
  },
  {
    fieldType: 'object',
    label: '采购机建',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseFlightTax'
  },
  {
    fieldType: 'object',
    label: '采购燃油',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseFuelTax'
  },
  {
    fieldType: 'object',
    label: '采购总税费',
    prop: 'issueFinancialReport',
    objectValue: 'sumPurchaseTax'
  },
  {
    fieldType: 'object',
    label: '采购代理费',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseAgencyFees'
  },
  {
    fieldType: 'object',
    label: '采购代理费费率',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseAgencyFeesRate'
  },
  {
    fieldType: 'object',
    label: '采购优惠券',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseCoupon'
  },
  {
    fieldType: 'object',
    label: '采购返现',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseCommissionMoney'
  },
  {
    fieldType: 'object',
    label: '采购后返',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseRebate'
  },
  {
    fieldType: 'object',
    label: '采购服务费',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseServiceFee'
  },
  {
    fieldType: 'object',
    label: '采购额外成本',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseAdditionalCosts'
  },
  {
    fieldType: 'object',
    label: '采购CA成本',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseCACosts'
  },
  {
    fieldType: 'object',
    label: '采购BOP手续费',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseBOPCosts'
  },
  {
    fieldType: 'object',
    label: '采购结算总价',
    prop: 'issueFinancialReport',
    objectValue: 'totalPurchaseSettlementPrice'
  },
  {
    fieldType: 'object',
    label: '采购保险成本',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseInsuranceCost'
  },
  {
    fieldType: 'object',
    label: '采购结算总价（含保险）',
    prop: 'issueFinancialReport',
    objectValue: 'totalPurchaseIncludeInsuranceSettlementPrice'
  },
  {
    fieldType: 'object',
    label: '采购账号',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseAccount'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'PurchasePayPlatformType',
    enumNamespace: 'AdminService',
    label: '采购支付方式',
    prop: 'issueFinancialReport',
    objectValue: 'purchasePayPlatform'
  },
  {
    fieldType: 'object',
    label: '采购出票订单号',
    prop: 'issueFinancialReport',
    objectValue: 'purchaseCarrierTicketNo'
  },
  {
    fieldType: 'object',
    label: '利润机票毛利',
    prop: 'issueFinancialReport',
    objectValue: 'ticketGrossProfit'
  },
  {
    fieldType: 'object',
    label: '利润保险毛利',
    prop: 'issueFinancialReport',
    objectValue: 'insuranceGrossProfit'
  },
  {
    fieldType: 'object',
    label: '利润销售毛利',
    prop: 'issueFinancialReport',
    objectValue: 'saleGrossProfit'
  },
  {
    fieldType: 'object',
    enumType: 'PassengerOriginType',
    enumNamespace: 'AdminService',
    label: '客户类型',
    prop: 'issueFinancialReport',
    objectValue: 'passengerOriginType'
  },
  {
    fieldType: 'object',
    label: '客户名称',
    prop: 'issueFinancialReport',
    objectValue: 'agentOrganizationName'
  },
  {
    fieldType: 'object',
    label: '出票创建公司',
    prop: 'issueFinancialReport',
    objectValue: 'creatorAgentOrganizationName'
  },
  {
    fieldType: 'object',
    label: '出票创建部门',
    prop: 'issueFinancialReport',
    objectValue: 'creatorAgentDepartmentName'
  },
  {
    fieldType: 'object',
    label: '出票创建人',
    prop: 'issueFinancialReport',
    objectValue: 'createUserName'
  },
  {
    fieldType: 'object',
    label: '出票创单OFFICE号',
    prop: 'issueFinancialReport',
    objectValue: 'createOfficeNo'
  },
  {
    fieldType: 'object',
    label: '出票公司',
    prop: 'issueFinancialReport',
    objectValue: 'issueAgentOrganizationName'
  },
  {
    fieldType: 'object',
    label: '出票部门',
    prop: 'issueFinancialReport',
    objectValue: 'issueAgentDepartmentName'
  },
  {
    fieldType: 'object',
    label: '出票人',
    prop: 'issueFinancialReport',
    objectValue: 'issueUserName'
  },
  {
    fieldType: 'object',
    label: '出票时间',
    prop: 'issueFinancialReport',
    objectValue: 'successTime'
  },
  {
    fieldType: 'object',
    label: '出票OFFICE号',
    prop: 'issueFinancialReport',
    objectValue: 'issueOfficeNo'
  },
  {
    fieldType: 'object',
    label: '出票工作号',
    prop: 'issueFinancialReport',
    objectValue: 'issueWorkNo'
  },
  {
    fieldType: 'object',
    label: '出票打印机号',
    prop: 'issueFinancialReport',
    objectValue: 'issuePrintNo'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'RefundType',
    enumNamespace: 'AdminService',
    label: '退票类型',
    prop: 'refundFinancialReport',
    objectValue: 'isVolunteerType'
  },
  {
    fieldType: 'object',
    label: '采购退票服务费',
    prop: 'refundFinancialReport',
    objectValue: 'refundServiceAmount'
  },
  {
    fieldType: 'object',
    label: '采购退票手续费',
    prop: 'refundFinancialReport',
    objectValue: 'feesAmount'
  },
  {
    fieldType: 'object',
    label: '采购退票升舱费',
    prop: 'refundFinancialReport',
    objectValue: 'changePriceDifference'
  },
  {
    fieldType: 'object',
    label: '采购退票改签费',
    prop: 'refundFinancialReport',
    objectValue: 'changePayAmount'
  },
  {
    fieldType: 'object',
    label: '采购退票改签服务费',
    prop: 'refundFinancialReport',
    objectValue: 'changeServiceFeesAmount'
  },
  {
    fieldType: 'object',
    label: '采购退票出票实付金额',
    prop: 'refundFinancialReport',
    objectValue: 'issuePaymentAmount'
  },
  {
    fieldType: 'object',
    label: '采购退票应退金额',
    prop: 'refundFinancialReport',
    objectValue: 'refundableAmount'
  },
  {
    fieldType: 'object',
    label: '采购退票实退金额',
    prop: 'refundFinancialReport',
    objectValue: 'refundAmount'
  },
  {
    fieldType: 'object',
    label: '与采购退票所属公司',
    prop: 'refundFinancialReport',
    objectValue: 'refundCompany'
  },
  {
    fieldType: 'object',
    label: '退票操作所属部门',
    prop: 'refundFinancialReport',
    objectValue: 'refundDepartment'
  },
  {
    fieldType: 'object',
    label: '与采购退票外出票单位',
    prop: 'refundFinancialReport',
    objectValue: 'refundIssueUnit'
  },
  {
    fieldType: 'object',
    label: '与采购退票退款科目',
    prop: 'refundFinancialReport',
    objectValue: 'refundAmountSubject'
  },
  {
    fieldType: 'object',
    label: '与采购退票交易流水号',
    prop: 'refundFinancialReport',
    objectValue: 'refundTradeFlowNo'
  },
  {
    fieldType: 'object',
    label: '与采购退票提交公司',
    prop: 'refundFinancialReport',
    objectValue: 'refundCommitCompany'
  },
  {
    fieldType: 'object',
    label: '采购创建部门',
    prop: 'refundFinancialReport',
    objectValue: 'refundCreateDepartment'
  },
  {
    fieldType: 'object',
    label: '采购退票创建人',
    prop: 'refundFinancialReport',
    objectValue: 'refundCreatePerson'
  },
  {
    fieldType: 'object',
    label: '采购退票创建时间',
    prop: 'refundFinancialReport',
    objectValue: 'refundCreateTime'
  },
  {
    fieldType: 'object',
    label: '采购退票确认退票部门',
    prop: 'refundFinancialReport',
    objectValue: 'refundTicketConfirmDepartment'
  },
  {
    fieldType: 'object',
    label: '采购退票确认退票人',
    prop: 'refundFinancialReport',
    objectValue: 'refundTicketConfirmPerson'
  },
  {
    fieldType: 'object',
    label: '采购退票确认退票时间',
    prop: 'refundFinancialReport',
    objectValue: 'refundTicketConfirmTime'
  },
  {
    fieldType: 'object',
    label: '采购退票确认退款部门',
    prop: 'refundFinancialReport',
    objectValue: 'refundAmountConfirmDepartment'
  },
  {
    fieldType: 'object',
    label: '采购退票确认退款人',
    prop: 'refundFinancialReport',
    objectValue: 'refundAmountConfirmPerson'
  },
  {
    fieldType: 'object',
    label: '采购退票确认退款时间',
    prop: 'refundFinancialReport',
    objectValue: 'refundAmountConfirmTime'
  },
  {
    fieldType: 'object',
    label: '销售退服务费',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundServiceAmount'
  },
  {
    fieldType: 'object',
    label: '销售加收服务费',
    prop: 'refundFinancialReport',
    objectValue: 'salesMarkupServiceAmount'
  },
  {
    fieldType: 'object',
    label: '销售保险销售价',
    prop: 'refundFinancialReport',
    objectValue: 'salesInsurancePrice'
  },
  {
    fieldType: 'object',
    label: '销售保险份数',
    prop: 'refundFinancialReport',
    objectValue: 'salesInsuranceCount'
  },
  {
    fieldType: 'object',
    label: '销售奖励现返',
    prop: 'refundFinancialReport',
    objectValue: 'salesRewardFirst'
  },
  {
    fieldType: 'object',
    label: '销售奖励后返',
    prop: 'refundFinancialReport',
    objectValue: 'salesRewardBack'
  },
  {
    fieldType: 'object',
    label: '销售退票退票手续费',
    prop: 'refundFinancialReport',
    objectValue: 'refundFeesAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票退支付手续费',
    prop: 'refundFinancialReport',
    objectValue: 'refundPayChannelFeesAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票升舱费',
    prop: 'refundFinancialReport',
    objectValue: 'priceDifference'
  },
  {
    fieldType: 'object',
    label: '销售奖励后返',
    prop: 'refundFinancialReport',
    objectValue: 'salesRewardBack'
  },
  {
    fieldType: 'object',
    label: '销售退票退票手续费',
    prop: 'refundFinancialReport',
    objectValue: 'refundFeesAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票退支付手续费',
    prop: 'refundFinancialReport',
    objectValue: 'refundPayChannelFeesAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票升舱费',
    prop: 'refundFinancialReport',
    objectValue: 'priceDifference'
  },
  {
    fieldType: 'object',
    label: '销售退票改签费',
    prop: 'refundFinancialReport',
    objectValue: 'changeFeesAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票出票实收',
    prop: 'refundFinancialReport',
    objectValue: 'salesIssuePaymentAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票应退金额',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundableAmount'
  },
  {
    fieldType: 'object',
    label: '销售退票退款状态',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundStatus'
  },
  {
    fieldType: 'object',
    label: '销售退票退票理由',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundReason'
  },
  {
    fieldType: 'object',
    label: '销售退票退票备注',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundRemark'
  },
  {
    fieldType: 'object',
    label: '销售退票创建部门',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundCreateDepartment'
  },
  {
    fieldType: 'object',
    label: '销售退票创建人',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundCreatePerson'
  },
  {
    fieldType: 'object',
    label: '销售退票确认退票部门',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundConfirmDepartment'
  },
  {
    fieldType: 'object',
    label: '销售退票确认退票人',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundConfirmPerson'
  },
  {
    fieldType: 'object',
    label: '销售退票确认退款部门',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundAmountConfirmDepartment'
  },
  {
    fieldType: 'object',
    label: '销售退票确认退款人',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundAmountConfirmPerson'
  },
  {
    fieldType: 'object',
    label: '销售退票确认退款时间',
    prop: 'refundFinancialReport',
    objectValue: 'salesRefundAmountConfirmTime'
  },
  {
    fieldType: 'object',
    label: '欠款结欠状态',
    prop: 'refundFinancialReport',
    objectValue: 'arrearsDebtStatus'
  },
  {
    fieldType: 'object',
    label: '毛利退票毛利',
    prop: 'refundFinancialReport',
    objectValue: 'refundProfit'
  },
  {
    fieldType: 'object',
    label: '毛利利润来源',
    prop: 'refundFinancialReport',
    objectValue: 'profitOrigin'
  },
  {
    fieldType: 'object',
    label: '外入外部单号',
    prop: 'refundFinancialReport',
    objectValue: 'outsideExternalNo'
  },
  {
    fieldType: 'object',
    label: '外入外入单号',
    prop: 'refundFinancialReport',
    objectValue: 'outsideNo'
  },
  {
    fieldType: 'object',
    label: '外入外单位是否收款',
    prop: 'refundFinancialReport',
    objectValue: 'outsideWhetherPayment'
  },
  {
    fieldType: 'object',
    label: '外入收款金额',
    prop: 'refundFinancialReport',
    objectValue: 'outsidePaymentAmount'
  },
  {
    fieldType: 'object',
    objectFieldType: 'enum',
    enumType: 'ChangeOrderType',
    enumNamespace: 'AdminService',
    label: '改签类型',
    prop: 'changeFinancialReport',
    objectValue: 'changeReasonType'
  },
  {
    fieldType: 'object',
    label: 'OFFICE采购科目',
    prop: 'changeFinancialReport',
    objectValue: 'officePurchaseCategory'
  },
  {
    fieldType: 'object',
    label: '改签前航段信息起飞时间',
    prop: 'changeFinancialReport',
    objectValue: 'originFlightDepartureTime'
  },
  {
    fieldType: 'object',
    label: '改签前航段信息航班',
    prop: 'changeFinancialReport',
    objectValue: 'originFlightNo'
  },
  {
    fieldType: 'object',
    label: '改签前航段信息舱位',
    prop: 'changeFinancialReport',
    objectValue: 'originFlightCabin'
  },
  {
    fieldType: 'object',
    label: '改签后航段信息起飞时间',
    prop: 'changeFinancialReport',
    objectValue: 'newFlightDepartureTime'
  },
  {
    fieldType: 'object',
    label: '改签后航段信息航班',
    prop: 'changeFinancialReport',
    objectValue: 'newFlightNo'
  },
  {
    fieldType: 'object',
    label: '改签后航段信息舱位',
    prop: 'changeFinancialReport',
    objectValue: 'newFlightCabin'
  },
  {
    fieldType: 'object',
    label: '客户结算类型',
    prop: 'changeFinancialReport',
    objectValue: 'customerSettlementType'
  },
  {
    fieldType: 'object',
    label: '改签客户收银员',
    prop: 'changeFinancialReport',
    objectValue: 'changeCustomerCashierPerson'
  },
  {
    fieldType: 'object',
    label: '改签客户收银状态',
    prop: 'changeFinancialReport',
    objectValue: 'changeCustomerCashierStatus'
  },
  {
    fieldType: 'object',
    label: '改签客户收银时间',
    prop: 'changeFinancialReport',
    objectValue: 'changeCustomerCashierTime'
  },
  {
    fieldType: 'object',
    label: '客户改签费',
    prop: 'changeFinancialReport',
    objectValue: 'customerChangeAmount'
  },
  {
    fieldType: 'object',
    label: '客户升舱费',
    prop: 'changeFinancialReport',
    objectValue: 'customerPriceDifference'
  },
  {
    fieldType: 'object',
    label: '客户改签服务费',
    prop: 'changeFinancialReport',
    objectValue: 'customerFlightServiceAmount'
  },
  {
    fieldType: 'object',
    label: '客户改签结算总价',
    prop: 'changeFinancialReport',
    objectValue: 'customerFlightSettlementTotal'
  },
  {
    fieldType: 'object',
    label: '改签支付方式',
    prop: 'changeFinancialReport',
    objectValue: 'flightPaymentChannel'
  },
  {
    fieldType: 'object',
    label: '欠款结欠状态',
    prop: 'changeFinancialReport',
    objectValue: 'arrearsDebtStatus'
  },
  {
    fieldType: 'object',
    label: '欠款结欠方式',
    prop: 'changeFinancialReport',
    objectValue: 'arrearsDebtType'
  },
  {
    fieldType: 'object',
    label: '欠款结欠科目',
    prop: 'changeFinancialReport',
    objectValue: 'arrearsDebtCategory'
  },
  {
    fieldType: 'object',
    label: '欠款结欠人',
    prop: 'changeFinancialReport',
    objectValue: 'arrearsDebtPerson'
  },
  {
    fieldType: 'object',
    label: '欠款结欠时间',
    prop: 'changeFinancialReport',
    objectValue: 'arrearsDebtTime'
  },
  {
    fieldType: 'object',
    label: '销售改签创建部门',
    prop: 'changeFinancialReport',
    objectValue: 'salesCreateDepartment'
  },
  {
    fieldType: 'object',
    label: '销售改签创建人',
    prop: 'changeFinancialReport',
    objectValue: 'salesCreatePerson'
  },
  {
    fieldType: 'object',
    label: '改签公司',
    prop: 'changeFinancialReport',
    objectValue: 'flightCompany'
  },
  {
    fieldType: 'object',
    label: '销售改签改签部门',
    prop: 'changeFinancialReport',
    objectValue: 'salesFlightDepartment'
  },
  {
    fieldType: 'object',
    label: '销售改签改签人',
    prop: 'changeFinancialReport',
    objectValue: 'salesFlightPerson'
  },
  {
    fieldType: 'object',
    label: '销售改签改签完成时间',
    prop: 'changeFinancialReport',
    objectValue: 'salesFlightSuccessTime'
  },
  {
    fieldType: 'object',
    label: '改签所属公司',
    prop: 'changeFinancialReport',
    objectValue: 'flightBelongCompany'
  },
  {
    fieldType: 'object',
    label: '改签所属部门',
    prop: 'changeFinancialReport',
    objectValue: 'flightBelongDepartment'
  },
  {
    fieldType: 'object',
    label: '采购改签改签前舱位',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeFrontCabin'
  },
  {
    fieldType: 'object',
    label: '采购改签改签后舱位',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeBackCabin'
  },
  {
    fieldType: 'object',
    label: '采购改签改签费',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeAmount'
  },
  {
    fieldType: 'object',
    label: '采购改签升舱费',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangePriceDifference'
  },
  {
    fieldType: 'object',
    label: '采购改签服务费',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeServiceAmount'
  },
  {
    fieldType: 'object',
    label: '采购改签结算总价',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeSettlementTotal'
  },
  {
    fieldType: 'object',
    label: '采购改签支付平台',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangePaymentPlatform'
  },
  {
    fieldType: 'object',
    label: '采购改签支付状态',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangePaymentStatus'
  },
  {
    fieldType: 'object',
    label: '采购改签支付流水',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangePaymentFlowNo'
  },
  {
    fieldType: 'object',
    label: '采购改签创建部门',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeCreateDepartment'
  },
  {
    fieldType: 'object',
    label: '采购改签创建人',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeCreatePerson'
  },
  {
    fieldType: 'object',
    label: '采购改签创建时间',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeCreateTime'
  },
  {
    fieldType: 'object',
    label: '采购改签改签部门',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeSuccessDepartment'
  },
  {
    fieldType: 'object',
    label: '采购改签改签人',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeSuccessPerson'
  },
  {
    fieldType: 'object',
    label: '采购改签改签完成时间',
    prop: 'changeFinancialReport',
    objectValue: 'purchaseChangeSuccessTime'
  }
]
export default {
  columns
}
