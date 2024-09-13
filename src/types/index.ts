import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface UserStructure {
	id: string;
	username: string;
	avatar: string;
}

export type Language = "pt-BR" | "en-US";

export type GuildTab = "channels" | "cases" | "connections" | "infos" | "width";

export type LanguageType = "pt-BR" | "en-US";

export interface UserContextProps {
	user: UserStructure | null;
	setUser: (user: UserStructure | null) => void;
}

export interface LanguageContextProps {
	language: LanguageType;
	setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

export enum PremiumType {
	None = 0,
	Normal = 1,
	Vip = 2,
}

export interface PremiumPayload {
	type: PremiumType;
	expiresAt: number;
}

export interface GuildPayload {
	name: string;
	icon: string;
	premium?: PremiumPayload;
	prefix?: string;
	id: string;
	connections: ConnectedConnectionPayload[];
	cases: AnyCase[];
	mods: ModType[];
	threads?: GuildThreadsPayload[];
	delete_threads_ids?: {
		id: string;
		parentId: string;
	}[];
	logs: GuildLogsPayload;
	metadata: {
		maxCharsPerMessage?: number;
	}
}

interface GuildLogsPayload {
    channelId?: string;
    flags: LogsFlag[];
}

export enum LogsFlag {
	LogAny,
    LogBans,
    LogTimeouts,
    LogNotes,
    LogPurges,
    LogLocks,
    LogConnections,
    LogReports,
}

export type AnyCase = TimeoutCase | BanCase;

export enum CaseTypes {
	Timeout = 0,
	Ban = 1,
	GuildBan = 2,
}

export interface TimeoutCase extends BaseCase<CaseTypes> {
	lifetime: number;
}

export type BanCase = BaseCase<CaseTypes.Ban>;

export interface BaseCase<Type extends CaseTypes> {
	type: Type;
	id: string;
	reason?: string;
	connection: string;
	targetId: string;
	target: {
		username: string;
		avatar: string;
	};
	moderator: {
		username: string;
		avatar: string;
	};
	moderatorId: string;
	createdTimestamp: number;
}

export interface ConnectedConnectionPayload {
	name: string;
	blockwords?: string[];
	language?: Languages;
	icon: string;
	description?: string;
	channelId: string;
	lockedAt?: number | null;
	flags: ConnectedConnectionFlags[];
}

export enum InitialPageConnectionFlags {
	AllowFiles = "ALLOW_FILES",
	AllowLinks = "ALLOW_LINKS",
	AllowOrigin = "ALLOW_ORIGIN",
	AutoTranslate = "AUTO_TRANSLATE",
	AllowEmojis = "ALLOW_EMOJIS",
	CompactModeEnabled = "COMPACT_MODE",
}
// nao sei porqu ta dion
export enum ConnectedConnectionFlags {
	Frozen = "FROZEN",
	AllowFiles = "ALLOW_FILES",
	AllowInvites = "ALLOW_INVITES",
	AllowLinks = "ALLOW_LINKS",
	NoIndentification = "NO_INDENTIFICATION",
	AllowOrigin = "ALLOW_ORIGIN",
	AllowEmojis = "ALLOW_EMOJIS",
	CompactModeEnabled = "COMPACT_MODE",
	AutoTranslate = "AUTO_TRANSLATE",
}

export interface ModType {
	id: string;
	username: string;
	avatar: string;
	type: ModPermType;
}

export enum ModPermType {
	TrustedAdmin = 1,
	PhysicalOwner = 2,
}

export interface ConnectionPayload {
	description?: string;
	icon?: string;
	name: string;
	private?: boolean;
	hashInvite?: string;
	creator: {
		id: string;
		username: string;
		avatar: string;
	};
	promotingSince?: number;
	creatorId?: string;
	votes: {
		_id: string;
		userId: string;
		count: number;
		lastVoteTimestamp: number;
	}[];
	tags: string[];
	createdTimestamp: number;
	maxConnections?: number;
	teamId?: string;
	rules?: string;
}

export interface RequestPost {
	name: string;
	description?: string;
	icon?: string;
	maxConnections?: number;
}

export interface PlanStructure {
	name: string;
	price: number;
	features: string[];
	popular: boolean;
}

export interface GuildChannelsPayload {
	id: string;
	name: string;
	position: number;
	nsfw?: boolean;
	parent_id?: string;
}

export enum Languages {
	af = "Afrikaans",
	sq = "Albanian",
	am = "Amharic",
	ar = "Arabic",
	hy = "Armenian",
	as = "Assamese",
	az = "Azerbaijani",
	bn = "Bangla",
	ba = "Bashkir",
	eu = "Basque",
	bho = "Bhojpuri",
	brx = "Bodo",
	bs = "Bosnian",
	bg = "Bulgarian",
	yue = "Cantonese (Traditional)",
	ca = "Catalan",
	hne = "Chhattisgarhi",
	lzh = "Chinese (Literary)",
	"zh-Hans" = "Chinese Simplified",
	"zh-Hant" = "Chinese Traditional",
	hr = "Croatian",
	cs = "Czech",
	da = "Danish",
	prs = "Dari",
	dv = "Divehi",
	doi = "Dogri",
	nl = "Dutch",
	en = "English",
	et = "Estonian",
	fo = "Faroese",
	fj = "Fijian",
	fil = "Filipino",
	fi = "Finnish",
	fr = "French",
	"fr-CA" = "French (Canada)",
	gl = "Galician",
	lug = "Ganda",
	ka = "Georgian",
	de = "German",
	el = "Greek",
	gu = "Gujarati",
	ht = "Haitian Creole",
	ha = "Hausa",
	he = "Hebrew",
	hi = "Hindi",
	mww = "Hmong Daw",
	hu = "Hungarian",
	is = "Icelandic",
	ig = "Igbo",
	id = "Indonesian",
	ikt = "Inuinnaqtun",
	iu = "Inuktitut",
	"iu-Latn" = "Inuktitut (Latin)",
	ga = "Irish",
	it = "Italian",
	ja = "Japanese",
	kn = "Kannada",
	ks = "Kashmiri",
	kk = "Kazakh",
	km = "Khmer",
	rw = "Kinyarwanda",
	"tlh-Latn" = "Klingon (Latin)",
	gom = "Konkani",
	ko = "Korean",
	ku = "Kurdish (Central)",
	kmr = "Kurdish (Northern)",
	ky = "Kyrgyz",
	lo = "Lao",
	lv = "Latvian",
	ln = "Lingala",
	lt = "Lithuanian",
	dsb = "Lower Sorbian",
	mk = "Macedonian",
	mai = "Maithili",
	mg = "Malagasy",
	ms = "Malay",
	ml = "Malayalam",
	mt = "Maltese",
	mr = "Marathi",
	"mn-Cyrl" = "Mongolian (Cyrillic)",
	"mn-Mong" = "Mongolian (Traditional)",
	my = "Myanmar (Burmese)",
	mi = "Māori",
	ne = "Nepali",
	nb = "Norwegian",
	nya = "Nyanja",
	or = "Odia",
	ps = "Pashto",
	fa = "Persian",
	pl = "Polish",
	pt = "Portuguese (Brazil)",
	"pt-PT" = "Portuguese (Portugal)",
	pa = "Punjabi",
	otq = "Querétaro Otomi",
	ro = "Romanian",
	run = "Rundi",
	ru = "Russian",
	sm = "Samoan",
	"sr-Cyrl" = "Serbian (Cyrillic)",
	"sr-Latn" = "Serbian (Latin)",
	st = "Sesotho",
	nso = "Sesotho sa Leboa",
	tn = "Setswana",
	sn = "Shona",
	sd = "Sindhi",
	si = "Sinhala",
	sk = "Slovak",
	sl = "Slovenian",
	so = "Somali",
	es = "Spanish",
	sw = "Swahili",
	sv = "Swedish",
	ty = "Tahitian",
	ta = "Tamil",
	tt = "Tatar",
	te = "Telugu",
	th = "Thai",
	bo = "Tibetan",
	ti = "Tigrinya",
	to = "Tongan",
	tr = "Turkish",
	tk = "Turkmen",
	uk = "Ukrainian",
	hsb = "Upper Sorbian",
	ur = "Urdu",
	ug = "Uyghur",
	uz = "Uzbek (Latin)",
	vi = "Vietnamese",
	cy = "Welsh",
	xh = "Xhosa",
	yo = "Yoruba",
	yua = "Yucatec Maya",
	zu = "Zulu",
}

export interface TabsStructure {
	value: string;
	title: string;
	content: ReactNode;
}

export interface ConnectionBody {
	channel: GuildChannelsPayload;
	name: string;
	hashInvite?: string;
	language?: {
		language: Languages | "";
		key: keyof typeof Languages | "";
	};
}

export interface ConnectedConnectionsState {
	hover: string | null;
	removing: string | null;
}

export interface DiscordMember {
	user: {
		username: string;
		avatar: string;
		id: string;
		bot: boolean;
		global_name?: string;
	};
}

export interface GuildThreadsPayload {
	id: string;
	originId: string;
	creatorId: string;
	children: string[];
	createdTimestamp: number;
}

export interface TabState {
	tabs: TabsStructure[];
	selected: string;
	connection: boolean;
}

export interface ConnectionsPageStructure {
	_id: string;
	team?: {
		name: string,
		iconURL: string;
	};
	name: string;
	creator: {
		id: string;
		username: string;
		avatar: string;
	};
	createdTimestamp: number;
	icon?: string;
	description?: string;
	votes: ConnectionsPageVote[];
	promotingSince?: number;
	tags: string[];
}

export interface ConnectionsPageVote {
	_id: string;
	userId: string;
	count: number;
	lastVoteTimestamp: number;
}

export interface Premium {
	isPremium: boolean;
	maxMods: number;
	maxConnections: number;
	maxThreads: number;
	premiumType: PremiumType;
}

export interface VotesPropsStructure {
	loading: boolean;
	voted: boolean;
	restime: boolean;
	votes: number;
	lastVoteTimestamp: number;
	canVote: boolean;
}

export interface ModsFiltersStructure {
	mod_id: null | string;
	target_id: null | string;
	type: null | number;
	connection: null | string;
}

export interface ConnectionsPageFilters {
	tag: string;
	sort: string;
	query: string;
	search: boolean;
}

export enum NotificationType {
	Reply = 1,
	Backup = 2,
	Internal = 3,
	TeamInvite = 4,
	PromotedCode = 5,
}

interface BaseNotificationPayload<Type extends NotificationType> {
	id: string;
	type: Type;
	content: string;
	sentTimestamp: number;
}

interface MessageReplyNotification
	extends BaseNotificationPayload<NotificationType.Reply> {
	messageURL: string;
}

interface TeamInviteNotification
	extends BaseNotificationPayload<NotificationType.TeamInvite> {
	teamId: string;
}

interface GuildBackupNotification
	extends BaseNotificationPayload<NotificationType.Backup> {
	backupId: string;
}

interface PromotedCodeNotification
	extends BaseNotificationPayload<NotificationType.PromotedCode> {
	codeId: string;
}

export type NotificationPayload =
	| MessageReplyNotification
	| TeamInviteNotification
	| GuildBackupNotification
	| PromotedCodeNotification
	| BaseNotificationPayload<NotificationType.Internal>;

export interface TeamPayload {
	id: string;
	name: string;
	iconURL?: string;
	creatorId: string;
	children: {
		name: string;
		icon?: string;
		description?: string;
	}[];
	createdTimestamp: number;
	members: TeamMemberPayload[];
}

export interface TeamMemberPayload {
	id: string;
	avatar: string;
	username: string;
	joinedTimestamp: number;
}

export interface ConnectionMetrics {
	views: number[];
	servers: number[];
	feedbacks: number[];
}

export interface AuditLogPayload {
	entries: AuditLogEntryPayload[];
}

export interface AuditLogEntryPayload {
	executorId: string;
	executor: {
		username: string;
		avatar: string;
	};
	createdTimestamp: number;
	actionType: AuditLogActionType;
	changes: AuditLogEntryChange[];
}

export enum AuditLogActionType {
	TeamAdd = 0,
	TeamRemove = 1,
	Privated = 2,
	ConnectionUpdate = 3,
}

interface BaseAuditLogEntryChange<Key extends string, Old, New = Old> {
	key: Key;
	old: Old;
	new: New;
}

export type AuditLogEntryChange =
	| TeamAddAuditLogEntryChange
	| TeamRemoveAuditLogEntryChange
	| ConnectionPrivateAuditLogEntryChange
	| ConnectionUpdateAuditLogEntryChange;

type TeamAddAuditLogEntryChange = BaseAuditLogEntryChange<
	"team_id",
	void,
	string
>;

type TeamRemoveAuditLogEntryChange = BaseAuditLogEntryChange<
	"team_id",
	string,
	void
>;

type ConnectionPrivateAuditLogEntryChange = BaseAuditLogEntryChange<
	"private",
	void | false,
	true
>;

type ConnectionUpdateAuditLogEntryChange =
	| ConnectionDescriptionOrIconUpdateAuditLogEntryChange
	| ConnectionTagsUpdateAuditLogEntryChange
	| ConnectionTagsUpdateAuditLogEntryChange
	| ConnectionMaxConnectionsUpdateAuditLogEntryChange
	| ConnectionNameUpdateAuditLogEntryChange;

type ConnectionDescriptionOrIconUpdateAuditLogEntryChange =
	BaseAuditLogEntryChange<"description" | "icon", string | void, string | void>;

type ConnectionNameUpdateAuditLogEntryChange = BaseAuditLogEntryChange<
	"name",
	string
>;

type ConnectionTagsUpdateAuditLogEntryChange = BaseAuditLogEntryChange<
	"tags",
	string[]
>;

type ConnectionMaxConnectionsUpdateAuditLogEntryChange =
	BaseAuditLogEntryChange<"maxConnections", number | void, number>;

export interface GuildSubscriptionPayload {
	id: string;
	name: string;
	icon: string;
	addedMods: number;
	addedConnections: number;
}

export interface ConnectionSubscriptionPayload {
	name: string;
	icon?: string;
	description?: string;
	promotingSince: number;
}

export interface SubscriptionsPayload {
	guilds: GuildSubscriptionPayload[];
	connections: ConnectionSubscriptionPayload[];
}
