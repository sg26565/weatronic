package de.treichels.wea.bat64.config;

public abstract class ConfigElement {
	private int typeinfo = 0;
	private int listIndex = -1;

	public int getListIndex() {
		return listIndex;
	}

	public int getTypeinfo() {
		return typeinfo;
	}

	public void setListIndex(final int listIndex) {
		this.listIndex = listIndex;
	}

	public void setTypeinfo(final int typeinfo) {
		this.typeinfo = typeinfo;
	}
}
